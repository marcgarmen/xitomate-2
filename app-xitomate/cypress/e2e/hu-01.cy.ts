describe('HU_01 - Registro de restaurante', () => {
  it('Permite registrar un restaurante correctamente', () => {
    cy.visit('/registro');

    
    cy.contains('Restaurante').click();

    
    cy.get('input[name="nombre"]').type('Tacos Don Pepe');
    cy.get('input[name="email"]').type('tacos@ejemplo.com');
    cy.get('input[name="password"]').type('12345678');
    cy.get('input[name="ubicacion"]').type('Av. del Maíz 123');

    
    cy.get('input[type="checkbox"]').check();

    
    cy.get('button[type="submit"]').click();

    
    cy.url().should('include', '/platillos');
  });
});
