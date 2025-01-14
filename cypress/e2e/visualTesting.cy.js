describe(`visual testing test`, () => {
    beforeEach(`open map`, () => {
        cy.navToPage()
        cy.wait(4000)
    })

    // it("take screenshot of the map", () => {
    //     cy.getMap().screenshot('map-snapshot');
    // })

    it('Compares the map screenshot with the baseline', () => {
        const baselinePath = 'cypress/screenshots/baseline/map-snapshot.png';
        const actualPath = 'cypress/screenshots/map-snapshot.png';
        const diffPath = 'cypress/screenshots/diff/map-diff.png';

        cy.navToPage()
        cy.wait(4000); // Wait for the map to load
        cy.getMap().screenshot('map-snapshot');

        cy.compareImages(baselinePath, actualPath, diffPath)
        // .then((message) => {
        //     debugger;

        //     cy.log(message); // Log success
        // }).catch((error) => {
        //     throw new Error(error); // Fail the test if images differ
        // });
    });
})