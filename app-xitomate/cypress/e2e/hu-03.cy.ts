describe('HU_03 - Visualización de productos del proveedor', () => {
  it('Permite a un restaurante ver los productos disponibles de proveedores', () => {
    
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@restaurante.com'); 
    cy.get('input[name="password"]').type('12345678');
    cy.get('button[type="submit"]').click();

    
    cy.visit('/productos-proveedores'); 

    
    cy.get('[data-testid="producto-nombre"]') 
      .should('have.length.at.least', 1);
  });
});
