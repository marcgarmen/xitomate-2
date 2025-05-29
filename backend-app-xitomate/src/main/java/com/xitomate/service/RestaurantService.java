package com.xitomate.service;

import com.xitomate.domain.dto.*;
import com.xitomate.domain.entity.*;
import com.xitomate.domain.enums.UserRole;
import com.xitomate.repository.*;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
public class RestaurantService {

    @Inject
    UserRepository userRepository;

    @Inject
    DishRepository dishRepository;

    @Inject
    SupplierProductRepository supplierProductRepository;

    @Inject
    SaleRepository saleRepository;

    @Inject
    SupplierRepository supplierRepository;

    @Transactional
    public UserDTO register(UserDTO userDTO) {
        User user = new User();
        user.email = userDTO.getEmail();
        user.password = userDTO.getPassword(); // En producción, esto debería estar hasheado
        user.role = UserRole.RESTAURANT;
        user.nombre = userDTO.getNombre();
        user.ubicacion = userDTO.getUbicacion();
        userRepository.persist(user);
        return userDTO;
    }

    public String login(UserDTO userDTO) {
        User user = userRepository.find("email", userDTO.getEmail()).firstResult();
        if (user != null && user.password.equals(userDTO.getPassword())) { // En producción, comparar hashes
            return "JWT_TOKEN"; // En producción, generar un token JWT real
        }
        throw new RuntimeException("Invalid credentials");
    }

    @Transactional
    public DishDTO createDish(DishDTO dishDTO, String restaurantEmail) {
        User restaurant = userRepository.find("email", restaurantEmail).firstResult();
        Dish dish = new Dish();
        dish.nombre = dishDTO.getNombre();
        dish.descripcion = dishDTO.getDescripcion();
        dish.precio = dishDTO.getPrecio();
        dish.categoria = dishDTO.getCategoria();
        dish.restaurant = restaurant;
        dish.activo = true;

        List<DishIngredient> ingredients = dishDTO.getIngredientes().stream()
            .map(di -> {
                DishIngredient ingredient = new DishIngredient();
                ingredient.dish = dish;
                ingredient.supplierProduct = supplierProductRepository.findById(di.getSupplierProductId());
                ingredient.cantidad = di.getCantidad();
                ingredient.unidad = di.getUnidad();
                return ingredient;
            })
            .collect(Collectors.toList());

        dish.ingredientes = ingredients;
        dishRepository.persist(dish);
        return dishDTO;
    }

    public List<DishDTO> getDishes(String restaurantEmail) {
        User restaurant = userRepository.find("email", restaurantEmail).firstResult();
        return dishRepository.find("restaurant", restaurant).stream()
            .map(dish -> {
                DishDTO dto = new DishDTO();
                dto.setNombre(dish.nombre);
                dto.setDescripcion(dish.descripcion);
                dto.setPrecio(dish.precio);
                dto.setCategoria(dish.categoria);
                return dto;
            })
            .collect(Collectors.toList());
    }

    @Transactional
    public SaleDTO createSale(SaleDTO saleDTO, String restaurantEmail) {
        User restaurant = userRepository.find("email", restaurantEmail).firstResult();
        Sale sale = new Sale();
        sale.restaurant = restaurant;
        sale.fecha = LocalDateTime.now();
        sale.metodoPago = saleDTO.getMetodoPago();

        List<SaleItem> items = saleDTO.getItems().stream()
            .map(item -> {
                SaleItem saleItem = new SaleItem();
                saleItem.sale = sale;
                saleItem.dish = dishRepository.findById(item.getDishId());
                saleItem.cantidad = item.getCantidad();
                saleItem.precioUnitario = saleItem.dish.precio;
                saleItem.subtotal = saleItem.precioUnitario.multiply(new BigDecimal(item.getCantidad()));
                return saleItem;
            })
            .collect(Collectors.toList());

        sale.items = items;
        sale.total = items.stream()
            .map(item -> item.subtotal)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        saleRepository.persist(sale);
        return saleDTO;
    }

    public List<SupplierDTO> getSuppliers() {
        return supplierRepository.listAll().stream()
            .map(supplier -> {
                SupplierDTO dto = new SupplierDTO();
                dto.setId(supplier.id);
                dto.setNombre(supplier.nombre);
                dto.setEmail(supplier.email);
                return dto;
            })
            .collect(Collectors.toList());
    }

    @Transactional
    public void addStock(StockDTO stockDTO, String restaurantEmail) {
        User restaurant = userRepository.find("email", restaurantEmail).firstResult();
        SupplierProduct product = supplierProductRepository.findById(stockDTO.getSupplierProductId());
        product.stock = product.stock + stockDTO.getCantidad().intValue();
        supplierProductRepository.persist(product);
    }

    public List<IngredientUsageDTO> getMostUsedIngredients(LocalDate date, String restaurantEmail) {
        User restaurant = userRepository.find("email", restaurantEmail).firstResult();
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();

        Map<SupplierProduct, BigDecimal> usageMap = new HashMap<>();
        saleRepository.find("restaurant", restaurant).stream()
            .filter(sale -> sale.fecha.isAfter(startOfDay) && sale.fecha.isBefore(endOfDay))
            .flatMap(sale -> sale.items.stream())
            .forEach(item -> {
                item.dish.ingredientes.forEach(ingredient -> {
                    usageMap.merge(ingredient.supplierProduct, 
                        ingredient.cantidad.multiply(new BigDecimal(item.cantidad)),
                        BigDecimal::add);
                });
            });

        return usageMap.entrySet().stream()
            .sorted(Map.Entry.<SupplierProduct, BigDecimal>comparingByValue().reversed())
            .map(entry -> {
                IngredientUsageDTO dto = new IngredientUsageDTO();
                dto.setNombre(entry.getKey().nombre);
                dto.setCantidad(entry.getValue());
                dto.setUnidad(entry.getKey().unidad);
                return dto;
            })
            .collect(Collectors.toList());
    }

    public List<DishSalesDTO> getTopDishes(LocalDate date, String restaurantEmail) {
        User restaurant = userRepository.find("email", restaurantEmail).firstResult();
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();

        Map<Dish, Integer> salesMap = new HashMap<>();
        saleRepository.find("restaurant", restaurant).stream()
            .filter(sale -> sale.fecha.isAfter(startOfDay) && sale.fecha.isBefore(endOfDay))
            .flatMap(sale -> sale.items.stream())
            .forEach(item -> {
                salesMap.merge(item.dish, item.cantidad, Integer::sum);
            });

        return salesMap.entrySet().stream()
            .sorted(Map.Entry.<Dish, Integer>comparingByValue().reversed())
            .map(entry -> {
                DishSalesDTO dto = new DishSalesDTO();
                dto.setNombre(entry.getKey().nombre);
                dto.setCantidad(entry.getValue());
                return dto;
            })
            .collect(Collectors.toList());
    }

    public List<SaleDTO> getDailySales(LocalDate date, String restaurantEmail) {
        User restaurant = userRepository.find("email", restaurantEmail).firstResult();
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();

        return saleRepository.find("restaurant", restaurant).stream()
            .filter(sale -> sale.fecha.isAfter(startOfDay) && sale.fecha.isBefore(endOfDay))
            .map(sale -> {
                SaleDTO dto = new SaleDTO();
                dto.setMetodoPago(sale.metodoPago);
                dto.setItems(sale.items.stream()
                    .map(item -> {
                        SaleItemDTO itemDTO = new SaleItemDTO();
                        itemDTO.setDishId(item.dish.id);
                        itemDTO.setCantidad(item.cantidad);
                        return itemDTO;
                    })
                    .collect(Collectors.toList()));
                return dto;
            })
            .collect(Collectors.toList());
    }

    public List<SupplierProductDTO> getLowStockIngredients(String restaurantEmail) {
        User restaurant = userRepository.find("email", restaurantEmail).firstResult();
        return supplierProductRepository.find("stock < ?1", 5).stream()
            .map(product -> {
                SupplierProductDTO dto = new SupplierProductDTO();
                dto.setNombre(product.nombre);
                dto.setPrecio(product.precio);
                dto.setUnidad(product.unidad);
                dto.setStock(product.stock);
                return dto;
            })
            .collect(Collectors.toList());
    }
} 