// for visual testing:
const fs = require('fs');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

Cypress.Commands.add('navToPage', () => cy.visit("http://localhost:5173/"))

Cypress.Commands.add(`getMap`, () => cy.get(".ol-viewport"))

Cypress.Commands.add(`shortenCoordinate`, (coordinate) => coordinate.map(num => num.toFixed(2)))

Cypress.Commands.add('compareImages', (baselinePath, actualPath, diffPath) => {
    return new Cypress.Promise((resolve, reject) => {
        debugger;

        const img1 = fs.createReadStream(baselinePath).pipe(new PNG()).on('parsed', doneReading);
        const img2 = fs.createReadStream(actualPath).pipe(new PNG()).on('parsed', doneReading);

        let filesRead = 0;

        function doneReading() {
            if (++filesRead < 2) return;

            const diff = new PNG({ width: img1.width, height: img1.height });
            const pixelDiffCount = pixelmatch(
                img1.data,
                img2.data,
                diff.data,
                img1.width,
                img1.height,
                { threshold: 0.1 } // Adjust sensitivity
            );

            diff.pack().pipe(fs.createWriteStream(diffPath));

            if (pixelDiffCount > 0) {
                reject(`Images do not match. ${pixelDiffCount} pixels differ.`);
            } else {
                resolve('Images match perfectly.');
            }
        }
    })
})
