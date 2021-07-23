/// <reference types="Cypress" />

export const brokenImageHeader = "h3"
export const brokenImageImageList = "div#content > .example"

export const basicAuthURL = "https://the-internet.herokuapp.com/basic_auth"

class basicAuthPage {
    getHeading(){
        return cy.get(brokenImageHeader)
    }

    getBrokenImageImageList(){
        return cy.get(brokenImageImageList)
    }
}
export default basicAuthPage;