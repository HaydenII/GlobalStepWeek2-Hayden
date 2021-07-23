/// <reference types="Cypress" />

export const abHeader = "h3"
export const abTextBody = "p"

class abTestPage {
    getHeading(){
        return cy.get(abHeader)
    }

    getTextBody(){
        return cy.get(abTextBody)
    }
    
}
export default abTestPage;