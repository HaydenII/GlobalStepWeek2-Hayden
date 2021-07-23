/// <reference types="Cypress" />

export const brokenImageHeader = "h3"
export const brokenImageImageList = "div#content > .example"

class statusCodesPage {
    getHeading(){
        return cy.get(brokenImageHeader)
    }
}
export default statusCodesPage;