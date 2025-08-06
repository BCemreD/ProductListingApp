describe('Product Page E2E', () => {
  it('should display products and allow search', () => {
    cy.visit('http://localhost:5173'); // For Vite
    cy.contains('Laptop');
    cy.contains('Webcam');

    cy.get('input[placeholder="Search products..."]').type('Laptop');
    cy.contains('Laptop').should('exist');
    cy.contains('Webcam').should('not.exist');
  });

  it('can add product to favorites', () => {
    cy.visit('http://localhost:5173');
    
    cy.contains('Laptop').parent().within(() => {
      cy.get('button').click(); // FavoriteButton
    });

    cy.on('window:alert', (str) => {
      expect(str).to.match(/added/i);
    });
  });
});
