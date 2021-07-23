/// <reference types="Cypress" />

export const brokenImageHeader = "h3"
export const brokenImageImageList = "div#content > .example"

class brokenImagePage {
    getHeading(){
        return cy.get(brokenImageHeader)
    }

    getBrokenImageImageList(){
        return cy.get(brokenImageImageList)
    }
}
export default brokenImagePage;