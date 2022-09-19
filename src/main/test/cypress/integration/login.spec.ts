import faker from '@faker-js/faker'
import * as FormHelper from '../utils/form-helpers'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /auth/
const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError(path)
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')
const mockSuccess = (): Cypress.Chainable => cy.fixture('account').then(fix => Http.mockOk(path, 'POST', fix))

const populateFields = (): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.internet.password(9))
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}
describe('login', () => {
  beforeEach(() => {
    if (Cypress.currentTest.title === 'should navigate to Panel page when account already defined') return
    cy.visit('login')
  })
  it('should load Input with correct initial state ', () => {
    FormHelper.testInputContent('email', '')
    FormHelper.testInputContent('password', '')
    cy.getByTestId('submit').click()
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
  })

  it('should present error state if is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('submit').click()
    FormHelper.testInputStatus('email', 'Email invalido.')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
  })

  it('should present valid state if is valid', () => {
    populateFields()
    cy.getByTestId('submit').click()
    FormHelper.testInputStatus('email')
    FormHelper.testInputStatus('password')
  })
  it('should present InvalidCredentialsError on 401', () => {
    mockInvalidCredentialsError()
    simulateValidSubmit()
    cy.get('#loginFormError').should('contain.text', 'Credenciais inválidas')
    Helper.testUrl('/login')
  })

  it('should present UnexpectedError on default error cases', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    cy.get('#loginFormError').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
    Helper.testUrl('/login')
  })

  it('should present save accesstoken if valid cretendials are provided', () => {
    mockSuccess()
    simulateValidSubmit()
    Helper.testUrl('/panel')
    Helper.testLocalStorageItem('account')
  })

  it('should prevent multiple submits', () => {
    mockSuccess()
    populateFields()
    cy.getByTestId('submit').dblclick()
    cy.wait('@request')
    Helper.testHttpCallsCount(1)
  })

  it('should not call submit if form is invalid', () => {
    mockSuccess()
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    Helper.testHttpCallsCount(0)
  })

  it('should navigate to signup page when clicking signup btn', () => {
    cy.getByTestId('signupBtn').click()
    Helper.testUrl('/signup')
  })
  it('should navigate to Panel page when account already defined', () => {
    Helper.SetLocalStorageItem('account', { accessToken: 'any_token', name: 'myCompany' })
    cy.visit('login')
    Helper.testUrl('/panel')
  })
})
