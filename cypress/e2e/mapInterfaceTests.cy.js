const TLVcoordinate = [ 34.7818, 32.0853 ]
// const rightEdgeCoordinate = [ 52.8242, 33.7851 ]
// const leftEdgeCoordinate = [ 14.5039, 35.1218 ]
const rightEdgeCoordinate = [ 30, 33.7851 ]
const leftEdgeCoordinate = [ 27.5039, 35.1218 ]

describe(`basic interface tests`, () => {
    beforeEach(`open map`, () => {
        cy.navToPage()
        cy.wait(4000)
    })

    it(`click on map by coordinate`, () => {
        cy.getMap().should('be.visible')

        cy.window().then(window => {
            const map = window.map
            const pixel = map.getPixelFromCoordinate(TLVcoordinate)
            debugger
            cy.getMap().click(pixel[0], pixel[1]).then(() => {

                cy.log(`clicked on Tel-Aviv (coordinate ${TLVcoordinate})`)
    
                cy.log(window.map.getAllLayers()[2].getSource().getFeatures()[0].getGeometry().flatCoordinates)
                // map.getAllLayers()[2].getSource().getFeatures()[0].getGeometry().flatCoordinates.should('deep.equal', TLVcoordinate)
            })
        })
    })

    // fix this
    // it(`drag from coordinate to coordinate`, () => {
    //     cy.window().then(window => {
    //         debugger;
    //         const map = window.map
    //         const pixel1 = map.getPixelFromCoordinate(rightEdgeCoordinate)
    //         const pixel2 = map.getPixelFromCoordinate(leftEdgeCoordinate)
    //     cy.getMap()
    //         .trigger('pointerdown', { which: 1, pageX: pixel1[0], pageY: pixel1[1] })
    //         .trigger('pointermove', { which: 1, pageX: pixel2[0], pageY: pixel2[1] })
    //         .trigger('pointerup')
    //     })
    // })

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