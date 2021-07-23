export function checkString(identifier, inStr){
    cy.get(identifier)
    .should("have.text", inStr)
}