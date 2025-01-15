import Pixelmatch from 'pixelmatch';
const PNG = require('pngjs').PNG;


describe(`visual testing test`, () => {
    beforeEach(`open map`, () => {
        cy.navToPage()
        cy.wait(4000)
        // cy.getMap().screenshot('baseSnapshot-map');
    })

    describe("Compares the map screenshot with the baseline", () => {
      it('positive test- compare to default map', () => {
        cy.getMap().screenshot('defaultMap-screenshot');
  
          cy.readFile(
              './cypress/screenshots/baseLine/baseSnapshot-map.png', 'base64'
            ).then(baseImage => {
              cy.readFile(
                './cypress/screenshots/defaultMap-screenshot.png', 'base64'
              ).then(mapImage => {
  
                cy.getPixelDifference(baseImage,mapImage).then(diffPercent => {
  
                  cy.log(`Found a ${diffPercent.toFixed(2)}% pixel difference`);
  
                  expect(diffPercent).to.be.below(0.1);
                })
              });
            });
      });
  
      it('negative test- compare to map with points', () => {
        cy.getMap().click(412.0431, 417.8676);
        cy.getMap().screenshot('mapWithPoint-screenshot');
  
          cy.readFile(
              './cypress/screenshots/baseLine/baseSnapshot-map.png', 'base64'
            ).then(baseImage => {
              cy.readFile(
                './cypress/screenshots/mapWithPoint-screenshot.png', 'base64'
              ).then(mapImage => {
  
                cy.getPixelDifference(baseImage,mapImage).then(diffPercent => {
  
                  cy.log(`Found a ${diffPercent.toFixed(2)}% pixel difference`);
  
                  expect(diffPercent).to.be.below(0.1);
                })
              });
            });
      });
    })
})