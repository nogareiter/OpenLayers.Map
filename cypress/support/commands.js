Cypress.Commands.add('navToPage', () => cy.visit("http://localhost:5173/"))

Cypress.Commands.add(`getMap`, () => cy.get(".ol-viewport"))