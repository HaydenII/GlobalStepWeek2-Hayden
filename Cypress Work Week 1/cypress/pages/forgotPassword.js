/// <reference types="Cypress" />

export const textBox = "#email"
export const submitButton = "#form_submit"

class forgotPasswordPage {
    getHeading(){
        return cy.get(brokenImageHeader)
    }

    getTextBox(){
        return cy.get(textBox)
    }

    getSubmitButton(){
        return cy.get(submitButton)
    }

}
export default forgotPasswordPage;