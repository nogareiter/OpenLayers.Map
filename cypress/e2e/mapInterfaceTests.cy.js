const TLVcoordinate = [ 34.7818, 32.0853 ]
const startCoordinate = [ 30, 33.7851 ]
const endCoordinate = [ 27.5039, 35.1218 ]

describe(`basic interface tests`, () => {
    beforeEach(`open map`, () => {
        cy.navToPage()
        cy.wait(4000)
    })

    it(`click on map by coordinate`, () => {
        cy.getMap().should('be.visible')

        cy.window().then(window => {
            const view = window.map.getView();
            view.setZoom(10) // zoom in for better presition

            cy.wait(500).then(() => {
                const map = window.map
                const pixel = map.getPixelFromCoordinate(TLVcoordinate)

                cy.getMap().click(pixel[0], pixel[1]).then(() => {
                    cy.log(`clicked on Tel-Aviv (coordinate ${TLVcoordinate})`)

                    // access the point's propperty in ol:
                    const newPoint = window.map.getAllLayers()[2].getSource().getFeatures()[0]; 
                    cy.log(`new point ID is ${newPoint.getId()}`) 
                    const pointCoordinate = newPoint.getGeometry().flatCoordinates 
                
                    cy.shortenCoordinate(pointCoordinate).then((coord) => {
                        cy.shortenCoordinate(TLVcoordinate).should('deep.equal', coord)
                    })
                })
            })
        })
    })

    // fix this
    it(`drag from coordinate to coordinate`, () => {
        cy.window().then(window => {
            debugger;
            const map = window.map
            const startPixel = map.getPixelFromCoordinate(startCoordinate)
            const endPixel = map.getPixelFromCoordinate(endCoordinate)
            
        cy.getMap()
        .trigger('pointerdown', {
            which: 1,
            clientX: startPixel[0],
            clientY: startPixel[1],
            bubbles: true
        })
        .trigger('pointermove', {
            which: 1,
            clientX: endPixel[0],
            clientY: endPixel[1],
            bubbles: true
        })
        .trigger('pointerup', {
            bubbles: true
        });
        })
    })

    it(`zoom in`, () => {
        cy.window().then((window) => {
            const view = window.map.getView();
            const initialZoom = view.getZoom();
            cy.getMap().trigger('wheel', {
                deltaY: -300, 
                bubbles: true, 
                cancelable: true
            });

            cy.wait(500).then(() => {
            const newZoom = view.getZoom();
            cy.log(`New Zoom Level: ${newZoom}`)

            expect(newZoom).to.be.greaterThan(initialZoom)
            })
        })
    })

    it(`zoom out`, () => {
        cy.window().then((window) => {
            debugger
            const view = window.map.getView();
            view.setZoom(7) // the map is automaticly in the max zoom out
            const initialZoom = view.getZoom();
            cy.wait(1000) // wait to see the initial zoom

            cy.getMap().trigger('wheel', {
                deltaY: 300, 
                bubbles: true, 
                cancelable: true
            });

            cy.wait(500).then(() => {
            const newZoom = view.getZoom();
            cy.log(`New Zoom Level: ${newZoom}`)
            
            expect(newZoom).to.be.lessThan(initialZoom)
            })
        })
    })

    afterEach(`wait to show`, () => {
        cy.wait(1000)
    })
})