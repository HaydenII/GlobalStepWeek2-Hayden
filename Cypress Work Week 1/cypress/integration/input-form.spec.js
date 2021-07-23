/// <reference types="Cypress" />

import { homePageStrings } from "../fixtures/commonStrings"
import { abTestStrings } from "../fixtures/commonStrings"
import { brokenImageStrings } from "../fixtures/commonStrings"
import { basicAuthStrings } from "../fixtures/commonStrings"
import { forgotPasswordStrings } from "../fixtures/commonStrings"


// Function to compare strings
import { checkString, templateCheck } from "../pages/generic";

import homePage, { HPheading, HPsubHeading, HPfooter } from "../pages/homePage.js";
const homePagenew = new homePage();

import abTestPage, { abHeader, abTextBody } from "../pages/abTesting.js";
const abTestPageNew = new abTestPage();

import brokenImagePage, { brokenImageHeader } from "../pages/brokenImages.js";
const brokenImagePageNew = new brokenImagePage();

import basicAuthPage, {basicAuthURL} from "../pages/basicAuth.js";
const basicAuthPageNew = new basicAuthPage();

import forgotPasswordPage from  "../pages/forgotPassword";
const forgotPasswordNew = new forgotPasswordPage();

// Describe groups tests

describe("Herokuapp Test", () => {

    beforeEach(()=>{
        // Connects to url
        cy.visit("/");
    })
    
    context("Home Page tests", () =>{
        it('Check header', () => {
            checkString(HPheading, homePageStrings.Heading)
        })
        
        it('Check subheader', () => {
            checkString(HPsubHeading, homePageStrings.SubHeading)
        })
        
        it('Count examples list', () => {
            homePagenew.getExampleList()
            .children()
            .then((elems) => {
                expect(elems).to.have.length(44)
            })
        })

        it('Check image', () =>{
            homePagenew.getGitHubLink()
            .find('img')
            .should('have.attr', 'src')
            .should('include','/img/forkme_right_green_007200.png')
        })
    
        it('Check GitHub Link', () => {
            homePagenew.getGitHubLink()
            .should('have.attr', 'href')
            .and('include', homePageStrings.GitHubLink)
        })
    
        it('Check Footer Text', () => {
            checkString(HPfooter, homePageStrings.footerText)
        })
    
        it('Check Footer Link', () => {
            homePagenew.getFooterLink()
            .should('have.attr', 'href')
            .and('include', homePageStrings.footerLink)
        })
    })
    
    context("A/B Test page", () =>{
        beforeEach(() =>{
            homePagenew.getAbTestPage()
            .click()
        })

        // The header can be one of two possible headers
        it('Check header', () => {
            abTestPageNew.getHeading()
            .then((title) => {
                expect(title.text()).to.be.oneOf([abTestStrings.HeadingVariation1, abTestStrings.HeadingVariation2]);
            })
        })

        it('Check text body', () => {
            abTestPageNew.getTextBody().contains(abTestStrings.textBody)
        })
    })
    

    context("Broken Images Test page", () =>{

        //https://stackoverflow.com/questions/51246606/test-loading-of-image-in-cypress To check if an image has loaded
        beforeEach(() =>{
            homePagenew.getBrokenImagePage()
            .click()
        })

        it('Check header', () => {
            checkString(brokenImageHeader, brokenImageStrings.Heading)
        })

        it("Check images", () => {
            cy.get('.example >img').each((web_element, index) => {
                
                //if (){
                   // cy.get('.example >img').eq(index).should('have.attr', 'src').contains("/img")
                //}
            });

        })

    })

    context("Authentication page", () =>{

        it('Check correct auth', () => {
            cy.request({
                url: basicAuthURL, 
                failOnStatusCode: true
                ,auth:
                {
                    username: basicAuthStrings.correctUName,
                    password: basicAuthStrings.correctpWord,
                },
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Check if authentication remains after clearing cookies', () => {
            cy.request({
                url: basicAuthURL, 
                failOnStatusCode: false
                ,auth:
                {
                    username: basicAuthStrings.correctUName,
                    password: basicAuthStrings.correctpWord,
                },
            })
            cy.clearCookies()
            cy.request({
                url: basicAuthURL, 
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401) // unauthorised
            })
        })

        it('Check if authentication remains between requests', () => {
            cy.request({
                url: basicAuthURL, 
                failOnStatusCode: true
                ,auth:
                {
                    username: basicAuthStrings.correctUName,
                    password: basicAuthStrings.correctpWord,
                },
            })
            cy.request({
                url: basicAuthURL, 
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401) // unauthorised
            })
        })

        it('Check incorrect auth', () => {

            cy.request({
                url: basicAuthURL, 
                failOnStatusCode: false,auth:
                {
                    username: basicAuthStrings.badUName,
                    password: basicAuthStrings.badpWord,
                },
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
            /*
            cy.visit("https://the-internet.herokuapp.com/basic_auth", {auth:{username:"fail", password: "fail"}})
            .then((page) =>{
                if (cy.wrap(page).contains("Congratulations!")){
                    throw new Error("Passed authentication with unauthorised login")
                }
            })
            */  
        })

    })
    
    context("Status codes", () =>{

        beforeEach(() =>{
            homePagenew.getStatusCodesPage()
            .click()
        })

        it("Check 200 response code", () => {

            cy.get('body:nth-child(2) div.row:nth-child(2) div.large-12.columns:nth-child(2) div.example > ul:nth-child(3)').each(($el) => {
                //$el.should('have.attr', 'href')
            })
/*
            cy.get('body:nth-child(2) div.row:nth-child(2) div.large-12.columns:nth-child(2) div.example > ul:nth-child(3)').each((web_element, index) => {
                
                cy.wrap(web_element)
                .should('have.attr', 'href')
                .then((href) => {
                    cy.visit(href)
                  })
            });
*/
        })

    })
    
    context("Forgot Password", () =>{
        beforeEach(() =>{
            homePagenew.getForgotPasswordPage()
            .click()
        })

        it("Enter password into text box and submit", () =>{
            forgotPasswordNew.getTextBox()
            .focus()
            .type("testemail@gmail.com")
            .should("have.value", "testemail@gmail.com")

            forgotPasswordNew.getSubmitButton()
            .click()
        })

    })

})