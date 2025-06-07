package com.xitomate.service;

import com.xitomate.domain.dto.*;
import com.xitomate.domain.entity.*;
import com.xitomate.domain.enums.UserRole;
import com.xitomate.domain.enums.OrderStatus;
import com.xitomate.domain.enums.PaymentMethod;
import com.xitomate.repository.*;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
public class RestaurantService {

    @Inject
    EntityManager entityManager;

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

    @Inject
    PasswordService passwordService;

    @Transactional
    public UserDTO register(UserDTO userDTO) {
        User existingUser = entityManager.createQuery(
            "SELECT u FROM User u WHERE u.email = :email", User.class)
            .setParameter("email", userDTO.getEmail())
            .getResultList()
            .stream()
            .findFirst()
            .orElse(null);

        if (existingUser != null) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.email = userDTO.getEmail();
        user.passwordSalt = passwordService.generateSalt();
        user.passwordHash = passwordService.hashPassword(userDTO.getPassword(), user.passwordSalt);
        user.role = UserRole.RESTAURANT;
        user.nombre = userDTO.getNombre();
        user.ubicacion = userDTO.getUbicacion();

        entityManager.persist(user);
        return userDTO;
    }

    public String login(UserDTO userDTO) {
        User user = entityManager.createQuery(
            "SELECT u FROM User u WHERE u.email = :email", User.class)
            .setParameter("email", userDTO.getEmail())
            .getResultList()
            .stream()
            .findFirst()
            .orElse(null);

        if (user == null || !passwordService.verifyPassword(userDTO.getPassword(), user.passwordSalt, user.passwordHash)) {
            throw new RuntimeException("Invalid credentials");
        }

        return generateToken(user);
    }

    @Transactional
    public DishDTO createDish(DishDTO dishDTO, String token) {
        try {
            // Buscar el restaurante por email
            User restaurant = entityManager.createQuery(
                "SELECT u FROM User u WHERE u.email = :email", User.class)
                .setParameter("email", "restaurant@test.com")
                .getSingleResult();

            if (restaurant == null) {
                throw new RuntimeException("Restaurant not found");
            }

            // Validar que el plato tenga ingredientes
            if (dishDTO.getIngredientes() == null || dishDTO.getIngredientes().isEmpty()) {
                throw new RuntimeException("El plato debe tener al menos un ingrediente");
            }

            // Crear el plato
            Dish dish = new Dish();
            dish.nombre = dishDTO.getNombre();
            dish.precio = dishDTO.getPrecio();
            dish.categoria = dishDTO.getCategoria();
            dish.restaurant = restaurant;

            // Persistir el plato primero
            entityManager.persist(dish);
            entityManager.flush();

            // Crear los ingredientes
            List<DishIngredient> ingredients = new ArrayList<>();
            for (DishIngredientDTO di : dishDTO.getIngredientes()) {
                DishIngredient ingredient = new DishIngredient();
                ingredient.dish = dish;
                ingredient.cantidad = di.getCantidad();
                ingredient.unidad = di.getUnidad();

                if (di.getSupplierProductId() != null) {
                    SupplierProduct product = entityManager.find(SupplierProduct.class, di.getSupplierProductId());
                    if (product == null) {
                        throw new RuntimeException("Producto no encontrado con ID: " + di.getSupplierProductId() + 
                            ". Asegúrate de usar un ID válido de la lista de productos disponibles.");
                    }
                    // Validar que la unidad coincida
                    if (!product.unidad.equalsIgnoreCase(di.getUnidad())) {
                        throw new RuntimeException("La unidad del ingrediente '" + product.nombre + 
                            "' debe ser '" + product.unidad + "', no '" + di.getUnidad() + "'");
                    }
                    ingredient.supplierProduct = product;
                    ingredient.nombreLibre = null;
                } else {
                    // Ingrediente libre
                    ingredient.supplierProduct = null;
                    ingredient.nombreLibre = di.getNombreLibre();
                }
                ingredients.add(ingredient);
            }

            // Asignar los ingredientes al plato
            dish.ingredientes = ingredients;
            
            // Persistir todo en una sola transacción
            entityManager.persist(dish);
            entityManager.flush();

            return dishDTO;
        } catch (Exception e) {
            throw new RuntimeException("Error al crear el plato: " + e.getMessage());
        }
    }

    public List<DishDTO> getDishes(String token) {
        // Buscar el restaurante por id
        User restaurant = entityManager.find(User.class, Long.parseLong(token));
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found");
        }
        List<Dish> dishes = entityManager.createQuery(
            "SELECT d FROM Dish d LEFT JOIN FETCH d.ingredientes WHERE d.restaurant = :restaurant", Dish.class)
            .setParameter("restaurant", restaurant)
            .getResultList();
        return dishes.stream()
            .map(dish -> {
                DishDTO dto = new DishDTO();
                dto.setId(dish.id);
                dto.setNombre(dish.nombre);
                dto.setPrecio(dish.precio);
                dto.setCategoria(dish.categoria);
                if (dish.ingredientes != null) {
                    dto.setIngredientes(
                        dish.ingredientes.stream().map(ing -> {
                            DishIngredientDTO ingDTO = new DishIngredientDTO();
                            ingDTO.setId(ing.id);
                            if (ing.supplierProduct != null) {
                                ingDTO.setSupplierProductId(ing.supplierProduct.id);
                            }
                            ingDTO.setCantidad(ing.cantidad);
                            ingDTO.setUnidad(ing.unidad);
                            ingDTO.setNombreLibre(ing.nombreLibre);
                            return ingDTO;
                        }).collect(Collectors.toList())
                    );
                } else {
                    dto.setIngredientes(List.of());
                }
                return dto;
            })
            .collect(Collectors.toList());
    }

    @Transactional
    public SaleDTO createSale(SaleDTO saleDTO, String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found with id: " + userId);
        }

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
        
        // Set the ID in the DTO before returning
        saleDTO.setId(sale.id);
        saleDTO.setFecha(sale.fecha);
        saleDTO.setTotal(sale.total);
        return saleDTO;
    }

    @Transactional
    public List<SaleDTO> getSales(String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found with id: " + userId);
        }

        List<Sale> sales = entityManager.createQuery(
            "SELECT DISTINCT s FROM Sale s " +
            "LEFT JOIN FETCH s.items i " +
            "LEFT JOIN FETCH i.dish " +
            "WHERE s.restaurant = :restaurant " +
            "ORDER BY s.fecha DESC", Sale.class)
            .setParameter("restaurant", restaurant)
            .getResultList();

        return sales.stream()
            .map(sale -> {
                SaleDTO dto = new SaleDTO();
                dto.setId(sale.id);
                dto.setMetodoPago(sale.metodoPago);
                dto.setFecha(sale.fecha);
                dto.setTotal(sale.total);
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

    @Transactional
    public SaleDTO getSale(Long saleId, String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found with id: " + userId);
        }

        Sale sale = entityManager.createQuery(
            "SELECT DISTINCT s FROM Sale s " +
            "LEFT JOIN FETCH s.items i " +
            "LEFT JOIN FETCH i.dish " +
            "WHERE s.id = :saleId AND s.restaurant = :restaurant", Sale.class)
            .setParameter("saleId", saleId)
            .setParameter("restaurant", restaurant)
            .getResultList()
            .stream()
            .findFirst()
            .orElse(null);

        if (sale == null) {
            throw new RuntimeException("Sale not found or unauthorized");
        }

        SaleDTO dto = new SaleDTO();
        dto.setId(sale.id);
        dto.setMetodoPago(sale.metodoPago);
        dto.setFecha(sale.fecha);
        dto.setTotal(sale.total);
        dto.setItems(sale.items.stream()
            .map(item -> {
                SaleItemDTO itemDTO = new SaleItemDTO();
                itemDTO.setDishId(item.dish.id);
                itemDTO.setCantidad(item.cantidad);
                return itemDTO;
            })
            .collect(Collectors.toList()));
        return dto;
    }

    @Transactional
    public SaleDTO updateSale(Long saleId, SaleDTO saleDTO, String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found with id: " + userId);
        }

        Sale sale = entityManager.createQuery(
            "SELECT DISTINCT s FROM Sale s " +
            "LEFT JOIN FETCH s.items i " +
            "LEFT JOIN FETCH i.dish " +
            "WHERE s.id = :saleId AND s.restaurant = :restaurant", Sale.class)
            .setParameter("saleId", saleId)
            .setParameter("restaurant", restaurant)
            .getResultList()
            .stream()
            .findFirst()
            .orElse(null);

        if (sale == null) {
            throw new RuntimeException("Sale not found or unauthorized");
        }

        // Update payment method
        sale.metodoPago = saleDTO.getMetodoPago();

        // Clear existing items
        sale.items.clear();

        // Add new items
        BigDecimal total = BigDecimal.ZERO;
        for (SaleItemDTO itemDTO : saleDTO.getItems()) {
            Dish dish = entityManager.find(Dish.class, itemDTO.getDishId());
            if (dish == null || !dish.restaurant.id.equals(restaurant.id)) {
                throw new RuntimeException("Dish not found or unauthorized");
            }

            SaleItem item = new SaleItem();
            item.sale = sale;
            item.dish = dish;
            item.cantidad = itemDTO.getCantidad();
            item.precioUnitario = dish.precio;
            item.subtotal = dish.precio.multiply(new BigDecimal(itemDTO.getCantidad()));
            total = total.add(item.subtotal);
            sale.items.add(item);
        }

        // Update total
        sale.total = total;

        // Merge the updated sale
        sale = entityManager.merge(sale);
        entityManager.flush();

        // Create response DTO
        SaleDTO responseDTO = new SaleDTO();
        responseDTO.setId(sale.id);
        responseDTO.setMetodoPago(sale.metodoPago);
        responseDTO.setFecha(sale.fecha);
        responseDTO.setTotal(sale.total);
        responseDTO.setItems(sale.items.stream()
            .map(item -> {
                SaleItemDTO itemDTO = new SaleItemDTO();
                itemDTO.setDishId(item.dish.id);
                itemDTO.setCantidad(item.cantidad);
                return itemDTO;
            })
            .collect(Collectors.toList()));

        return responseDTO;
    }

    @Transactional
    public void deleteSale(Long saleId, String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found with id: " + userId);
        }

        Sale sale = saleRepository.findById(saleId);
        if (sale == null || !sale.restaurant.id.equals(restaurant.id)) {
            throw new RuntimeException("Sale not found or unauthorized");
        }

        saleRepository.delete(sale);
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
    public void addStock(StockDTO stockDTO, String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found with id: " + userId);
        }

        SupplierProduct product = supplierProductRepository.findById(stockDTO.getSupplierProductId());
        if (product == null) {
            throw new RuntimeException("Product not found with id: " + stockDTO.getSupplierProductId());
        }

        product.stock = product.stock + stockDTO.getCantidad().intValue();
        supplierProductRepository.persist(product);
    }

    public List<IngredientUsageDTO> getMostUsedIngredients(LocalDate date, String email) {
        User restaurant = userRepository.find("email", email).firstResult();
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found with email: " + email);
        }

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

    public List<DishSalesDTO> getTopDishes(LocalDate date, String email) {
        User restaurant = userRepository.find("email", email).firstResult();
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found with email: " + email);
        }

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

    public List<SaleDTO> getDailySales(LocalDate date, String email) {
        User restaurant = userRepository.find("email", email).firstResult();
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found with email: " + email);
        }

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

    public List<SupplierProductDTO> getLowStockIngredients(String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found with id: " + userId);
        }

        return supplierProductRepository.find("stock < ?1", 5).list().stream()
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

    @Transactional
    public DishDTO updateDish(Long dishId, DishDTO dishDTO, String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found with id: " + userId);
        }

        Dish dish = entityManager.find(Dish.class, dishId);
        if (dish == null) {
            throw new RuntimeException("Dish not found with id: " + dishId);
        }

        // Verificar que el plato pertenece al restaurante
        if (!dish.restaurant.id.equals(restaurant.id)) {
            throw new RuntimeException("Unauthorized: This dish does not belong to your restaurant");
        }

        // Actualizar datos básicos
        dish.nombre = dishDTO.getNombre();
        dish.precio = dishDTO.getPrecio();
        dish.categoria = dishDTO.getCategoria();

        // Eliminar ingredientes existentes
        dish.ingredientes.clear();

        // Crear nuevos ingredientes
        if (dishDTO.getIngredientes() != null && !dishDTO.getIngredientes().isEmpty()) {
            for (DishIngredientDTO di : dishDTO.getIngredientes()) {
                DishIngredient ingredient = new DishIngredient();
                ingredient.dish = dish;
                ingredient.cantidad = di.getCantidad();
                ingredient.unidad = di.getUnidad();

                if (di.getSupplierProductId() != null) {
                    SupplierProduct product = entityManager.find(SupplierProduct.class, di.getSupplierProductId());
                    if (product == null) {
                        throw new RuntimeException("Producto no encontrado con ID: " + di.getSupplierProductId());
                    }
                    if (!product.unidad.equalsIgnoreCase(di.getUnidad())) {
                        throw new RuntimeException("La unidad del ingrediente '" + product.nombre + 
                            "' debe ser '" + product.unidad + "', no '" + di.getUnidad() + "'");
                    }
                    ingredient.supplierProduct = product;
                    ingredient.nombreLibre = null;
                } else {
                    ingredient.supplierProduct = null;
                    ingredient.nombreLibre = di.getNombreLibre();
                }
                dish.ingredientes.add(ingredient);
            }
        }

        entityManager.merge(dish);
        return dishDTO;
    }

    @Transactional
    public void deleteDish(Long dishId, String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found with id: " + userId);
        }

        Dish dish = entityManager.find(Dish.class, dishId);
        if (dish == null) {
            throw new RuntimeException("Dish not found with id: " + dishId);
        }

        // Verificar que el plato pertenece al restaurante
        if (!dish.restaurant.id.equals(restaurant.id)) {
            throw new RuntimeException("Unauthorized: This dish does not belong to your restaurant");
        }

        entityManager.remove(dish);
    }

    // --- Métodos de análisis para RestaurantAnalysisController ---
    public List<DishSalesDTO> getTopDishesForAnalysis(String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) throw new RuntimeException("Restaurant not found");

        Map<String, Integer> dishSales = new HashMap<>();
        saleRepository.find("restaurant", restaurant).list().stream()
            .flatMap(sale -> sale.items.stream())
            .forEach(item -> {
                String dishName = item.dish.nombre;
                dishSales.put(dishName, dishSales.getOrDefault(dishName, 0) + item.cantidad);
            });

        return dishSales.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
            .limit(3)
            .map(entry -> {
                DishSalesDTO dto = new DishSalesDTO();
                dto.setNombre(entry.getKey());
                dto.setCantidad(entry.getValue());
                return dto;
            })
            .collect(Collectors.toList());
    }

    public Map<String, List<IngredientUsageDTO>> getIngredientUsageForAnalysis(String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) throw new RuntimeException("Restaurant not found");

        Map<String, IngredientUsageDTO> usageMap = new HashMap<>();
        saleRepository.find("restaurant", restaurant).list().stream()
            .flatMap(sale -> sale.items.stream())
            .forEach(item -> {
                for (DishIngredient ingredient : item.dish.ingredientes) {
                    String name = ingredient.supplierProduct != null
                        ? ingredient.supplierProduct.nombre
                        : ingredient.nombreLibre;
                    if (name == null) continue;
                    BigDecimal used = ingredient.cantidad.multiply(new BigDecimal(item.cantidad));
                    if (usageMap.containsKey(name)) {
                        IngredientUsageDTO dto = usageMap.get(name);
                        dto.setCantidad(dto.getCantidad().add(used));
                    } else {
                        IngredientUsageDTO dto = new IngredientUsageDTO();
                        dto.setNombre(name);
                        dto.setCantidad(used);
                        dto.setUnidad(ingredient.unidad);
                        usageMap.put(name, dto);
                    }
                }
            });

        List<IngredientUsageDTO> sorted = usageMap.values().stream()
            .sorted(Comparator.comparing(IngredientUsageDTO::getCantidad).reversed())
            .collect(Collectors.toList());

        Map<String, List<IngredientUsageDTO>> result = new HashMap<>();
        result.put("mostUsed", sorted.stream().limit(3).collect(Collectors.toList()));
        result.put("leastUsed", sorted.stream().skip(Math.max(0, sorted.size() - 2)).collect(Collectors.toList()));
        return result;
    }

    public Map<String, Object> getDailyIncomeForAnalysis(String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) throw new RuntimeException("Restaurant not found");

        // Get sales for the last 7 days
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(6);

        List<Map<String, Object>> dailyIncomes = new ArrayList<>();
        
        for (int i = 0; i <= 6; i++) {
            LocalDate date = startDate.plusDays(i);
            BigDecimal total = saleRepository.find("restaurant", restaurant).list().stream()
                .filter(sale -> sale.fecha.toLocalDate().equals(date))
                .map(sale -> sale.total)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

            Map<String, Object> dailyIncome = new HashMap<>();
            dailyIncome.put("date", date);
            dailyIncome.put("income", total);
            dailyIncomes.add(dailyIncome);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("dailyIncomes", dailyIncomes);
        return result;
    }

    public Map<String, String> getTopSupplierForAnalysis(String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) throw new RuntimeException("Restaurant not found");

        Map<String, Integer> supplierCount = new HashMap<>();
        saleRepository.find("restaurant", restaurant).list().stream()
            .flatMap(sale -> sale.items.stream())
            .forEach(item -> {
                for (DishIngredient ingredient : item.dish.ingredientes) {
                    if (ingredient.supplierProduct != null && ingredient.supplierProduct.supplier != null) {
                        String supplierName = ingredient.supplierProduct.supplier.nombre;
                        supplierCount.put(supplierName, supplierCount.getOrDefault(supplierName, 0) + 1);
                    }
                }
            });

        String topSupplier = supplierCount.entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .map(Map.Entry::getKey)
            .orElse("Sin proveedor");

        Map<String, String> result = new HashMap<>();
        result.put("topSupplier", topSupplier);
        return result;
    }

    public List<Map<String, Object>> getIngredientUsageHistoryForForecast(String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) throw new RuntimeException("Restaurant not found");

        Map<String, Map<LocalDate, BigDecimal>> history = new HashMap<>();
        saleRepository.find("restaurant", restaurant).list().forEach(sale -> {
            LocalDate date = sale.fecha.toLocalDate();
            for (SaleItem item : sale.items) {
                for (DishIngredient ingredient : item.dish.ingredientes) {
                    String name = ingredient.supplierProduct != null
                        ? ingredient.supplierProduct.nombre
                        : ingredient.nombreLibre;
                    if (name == null) continue;
                    BigDecimal used = ingredient.cantidad.multiply(new BigDecimal(item.cantidad));
                    history.computeIfAbsent(name, k -> new HashMap<>());
                    Map<LocalDate, BigDecimal> dateMap = history.get(name);
                    dateMap.put(date, dateMap.getOrDefault(date, BigDecimal.ZERO).add(used));
                }
            }
        });

        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, Map<LocalDate, BigDecimal>> entry : history.entrySet()) {
            Map<String, Object> obj = new HashMap<>();
            obj.put("ingredient", entry.getKey());
            List<String> dates = entry.getValue().keySet().stream()
                .sorted()
                .map(LocalDate::toString)
                .collect(Collectors.toList());
            List<Double> quantities = dates.stream()
                .map(d -> entry.getValue().getOrDefault(LocalDate.parse(d), BigDecimal.ZERO).doubleValue())
                .collect(Collectors.toList());
            // FILTRO: solo ingredientes con al menos 3 días y cantidades variables
            if (quantities.size() >= 3 && quantities.stream().distinct().count() > 1) {
                obj.put("dates", dates);
                obj.put("quantities", quantities);
                result.add(obj);
            }
        }
        return result;
    }

    @Transactional
    public void addOrUpdateInventory(Long restaurantId, Long supplierProductId, String nombreLibre, Integer stock, String unidad, BigDecimal precio) {
        User restaurant = entityManager.find(User.class, restaurantId);
        if (restaurant == null) throw new RuntimeException("Restaurant not found");

        // Si es un producto de proveedor, obtener sus valores por defecto
        SupplierProduct supplierProduct = null;
        if (supplierProductId != null) {
            supplierProduct = entityManager.find(SupplierProduct.class, supplierProductId);
            if (supplierProduct == null) throw new RuntimeException("Supplier product not found");
            
            // Usar valores del producto si no se proporcionan
            if (unidad == null) unidad = supplierProduct.unidad;
            if (precio == null) precio = supplierProduct.precio;
        }

        RestaurantInventory inventory;
        if (supplierProductId != null) {
            inventory = entityManager.createQuery(
                "SELECT ri FROM RestaurantInventory ri WHERE ri.restaurant.id = :restaurantId AND ri.supplierProduct.id = :supplierProductId", RestaurantInventory.class)
                .setParameter("restaurantId", restaurantId)
                .setParameter("supplierProductId", supplierProductId)
                .getResultStream().findFirst().orElse(null);
        } else {
            inventory = entityManager.createQuery(
                "SELECT ri FROM RestaurantInventory ri WHERE ri.restaurant.id = :restaurantId AND ri.nombreLibre = :nombreLibre", RestaurantInventory.class)
                .setParameter("restaurantId", restaurantId)
                .setParameter("nombreLibre", nombreLibre)
                .getResultStream().findFirst().orElse(null);
        }

        if (inventory == null) {
            inventory = new RestaurantInventory();
            inventory.restaurant = restaurant;
            inventory.supplierProduct = supplierProduct;
            inventory.nombreLibre = nombreLibre;
        }

        // Actualizar solo los campos que no son null
        if (stock != null) inventory.stock = stock;
        if (unidad != null) inventory.unidad = unidad;
        if (precio != null) inventory.precio = precio;

        entityManager.persist(inventory);
    }

    public List<Map<String, Object>> getCurrentInventory(String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) throw new RuntimeException("Restaurant not found");
        List<RestaurantInventory> inventory = entityManager.createQuery(
            "SELECT ri FROM RestaurantInventory ri WHERE ri.restaurant.id = :restaurantId", RestaurantInventory.class)
            .setParameter("restaurantId", restaurant.id)
            .getResultList();
        return inventory.stream()
            .map(ri -> {
                Map<String, Object> map = new HashMap<>();
                map.put("ingredient", ri.supplierProduct != null ? ri.supplierProduct.nombre : ri.nombreLibre);
                map.put("stock", ri.stock);
                map.put("unit", ri.unidad);
                map.put("precio", ri.precio);
                map.put("supplierProductId", ri.supplierProduct != null ? ri.supplierProduct.id : null);
                map.put("nombreLibre", ri.nombreLibre);
                return map;
            })
            .collect(Collectors.toList());
    }

    @Transactional
    public OrderRequestDTO createOrder(OrderRequestDTO orderDTO, String userId) {
        User restaurant = entityManager.find(User.class, Long.parseLong(userId));
        if (restaurant == null) {
            throw new RuntimeException("Restaurant not found");
        }

        User supplier = entityManager.find(User.class, orderDTO.getSupplierId());
        if (supplier == null || !supplier.role.equals(UserRole.SUPPLIER)) {
            throw new RuntimeException("Supplier not found or invalid");
        }

        OrderRequest order = new OrderRequest();
        order.restaurant = restaurant;
        order.supplier = supplier;
        order.fecha = LocalDate.now();
        order.status = OrderStatus.PENDIENTE;
        order.paymentMethod = PaymentMethod.valueOf(orderDTO.getPaymentMethod());

        List<OrderProduct> orderProducts = orderDTO.getItems().stream()
            .map(item -> {
                SupplierProduct product = entityManager.find(SupplierProduct.class, item.getSupplierProductId());
                if (product == null) {
                    throw new RuntimeException("Product not found with id: " + item.getSupplierProductId());
                }
                if (!product.supplier.id.equals(supplier.id)) {
                    throw new RuntimeException("Product with id " + item.getSupplierProductId() + " does not belong to supplier " + supplier.nombre);
                }

                OrderProduct orderProduct = new OrderProduct();
                orderProduct.order = order;
                orderProduct.supplierProduct = product;
                orderProduct.cantidad = item.getCantidad();
                orderProduct.precioUnitario = product.precio;
                return orderProduct;
            })
            .collect(Collectors.toList());

        order.orderProducts = orderProducts;
        order.total = orderProducts.stream()
            .map(item -> item.precioUnitario.multiply(new BigDecimal(item.cantidad)))
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        entityManager.persist(order);
        return orderDTO;
    }

    public List<SupplierProductDTO> getAvailableProducts() {
        return supplierProductRepository.listAll().stream()
            .map(product -> {
                SupplierProductDTO dto = new SupplierProductDTO();
                dto.setId(product.id);
                dto.setNombre(product.nombre);
                dto.setPrecio(product.precio);
                dto.setUnidad(product.unidad);
                dto.setStock(product.stock);
                return dto;
            })
            .collect(Collectors.toList());
    }

    private String generateToken(User user) {
        // En producción, implementar generación de JWT real
        return "JWT_TOKEN_" + user.id;
    }
} 