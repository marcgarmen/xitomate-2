describe('HU_02 - Subida de platillos al menú', () => {
  it('Permite agregar un platillo correctamente', () => {
   
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@restaurante.com'); 
    cy.get('input[name="password"]').type('12345678'); 
    cy.get('button[type="submit"]').click();

    
    cy.visit('/platillos');

    
    cy.get('input[name="nombre"]').type('Quesadilla');
    cy.get('textarea[name="descripcion"]').type('Deliciosa quesadilla de queso con tortilla hecha a mano.');
    cy.get('input[name="precio"]').type('45');
    cy.get('select[name="categoria"]').select('Antojitos'); 

    
    cy.get('button[type="submit"]').click();

    
    cy.contains('Quesadilla').should('exist');
  });
});
