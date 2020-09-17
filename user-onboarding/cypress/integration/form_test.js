describe('User Onboarding app', () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
    })

    const nameInput = () => cy.get('input[name=name]')
    const emailInput = () => cy.get('input[name=email]')
    const passwordInput = () => cy.get('input[name=password]')
    const termsCheckbox = () => cy.get('input[name=agree]')
    const submitButton = () => cy.get('button[id="submitButton"]')

    it('can type in the name input', () => {
        nameInput()
            .should('have.value', '')
            .type('This is a test of the name input')
            .should('have.value', 'This is a test of the name input')
            .clear()
    }) 

    it('can type in the email input', () => {
        emailInput()
            .should('have.value', '')
            .type('This is a test of the email input')
            .should('have.value', 'This is a test of the email input')
            .clear()
    }) 

    it('can type in the password input', () => {
        passwordInput()
            .should('have.value', '')
            .type('This is a test of the password input')
            .should('have.value', 'This is a test of the password input')
            .clear()
    }) 

    it('can check the terms checkbox', () => {
        termsCheckbox()
            .should('not.be.checked')
            .check()
            .should('be.checked')
            .uncheck()
    }) 

    it('can submit a new user', () => {
        cy.contains(/test name/).should('not.exist')
        nameInput().type('test name')
        emailInput().type('test@test.com')
        passwordInput().type('test')
        termsCheckbox().check()
        submitButton().click()
        cy.contains(/test name/).should('exist')
      })

      it('form does not submit if field is left empty', () => {
        cy.contains(/test name/).should('not.exist')
        nameInput().type('test name')
        emailInput().type('test@test.com')
        passwordInput().type('test')
        submitButton().click()
        cy.contains(/test name/).should('not.exist')
      })

})