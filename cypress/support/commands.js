// for visual testing:
import Pixelmatch from 'pixelmatch';
const PNG = require('pngjs').PNG;

Cypress.Commands.add('navToPage', () => cy.visit("http://localhost:5173/"))

Cypress.Commands.add(`getMap`, () => cy.get(".ol-viewport"))

Cypress.Commands.add(`shortenCoordinate`, (coordinate) => coordinate.map(num => num.toFixed(2)))

Cypress.Commands.add('getPixelDifference', (baseImage, image) => {
    const img1 = PNG.sync.read(Buffer.from(baseImage, 'base64'));
    const img2 = PNG.sync.read(Buffer.from(image, 'base64'));
    const { width, height } = img1;
    const diff = new PNG({ width, height });
          
    const numDiffPixels = Pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.005 });
    const diffPercent = (numDiffPixels / (width * height) * 100);
      
    return diffPercent;
})