/// <reference types="Cypress" />

export const HPexamplesList = "body:nth-child(2) div.row:nth-child(2) div.large-12.columns:nth-child(2) > ul:nth-child(4)"
export const HPexampleListLength = 44;
export const HPheading = "div#content > .heading"
export const HPsubHeading = "div#content > h2"
export const HPgithubLink = "div:nth-of-type(2) > a"
export const HPfooter = "div#page-footer > div > div"
export const HPfooterLink = "a[target='_blank']"

// Page link
export const HP_ABTestLink = "[href='\/abtest']"
export const HP_BrokenImageLink = "[href='\/broken_images']"
export const HP_BasicAuthLink = "[href='\/basic_auth']"
export const HP_StatusCodes = "div.row:nth-child(2) div.large-12.columns:nth-child(2) ul:nth-child(4) li:nth-child(42) > a:nth-child(1)"
export const HP_ForgotPassoword = "div.row:nth-child(2) div.large-12.columns:nth-child(2) ul:nth-child(4) li:nth-child(20) > a:nth-child(1)"

class homePage {
    getExampleList(){
        return cy.get(HPexamplesList)
    }

    getHeading(){
        return cy.get(HPheading)
    }

    getSubHeading(){
        return cy.get(HPsubHeading)
    }
    
    getGitHubLink(){
        return cy.get(HPgithubLink)
    }

    getFooter(){
        return cy.get(HPfooter)
    }

    getFooterLink(){
        return cy.get(HPfooterLink)
    }

    getAbTestPage(){
        return cy.get(HP_ABTestLink)
    }

    getBrokenImagePage(){
        return cy.get(HP_BrokenImageLink)
    }

    getBasicAuthPage(){
        return cy.get(HP_BasicAuthLink)
    }

    getStatusCodesPage(){
        return cy.get(HP_StatusCodes)
    }

    getForgotPasswordPage(){
        return cy.get(HP_ForgotPassoword)
    }
}
export default homePage;