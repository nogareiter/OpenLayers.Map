const coordinate = [ 34.7818, 32.0853 ]

describe(`basic interface tests`, () => {
    before(`open map`, () => {
        cy.navToPage()
        cy.wait(2000)
    })

    it(`click on map by coordinate`, () => {
        cy.getMap().should('be.visible')

        cy.window().then(window => {
            const map = window.map
            const pixel = map.getPixelFromCoordinate(coordinate)
            cy.getMap().click(pixel[0], pixel[1])
            cy.log(`clicked on Tel-Aviv (coordinate ${coordinate})`)
        })
    })
})