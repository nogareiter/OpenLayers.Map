Cypress.Commands.add('navToPage', () => cy.visit("http://localhost:5173/"))

Cypress.Commands.add(`getMap`, () => cy.get(".ol-viewport"))

Cypress.Commands.add(`shortenCoordinate`, (coordinate) => coordinate.map(num => num.toFixed(2)))
 