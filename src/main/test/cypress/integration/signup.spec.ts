import faker from '@faker-js/faker'
import * as FormHelper from '../utils/form-helpers'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /signup/
const mockEmailInUseError = (): void => Http.mockForbiddenError(path, 'POST')
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')
// const mockSuccess = (): Cypress.Chainable => cy.fixture('account').then(fix => Http.mockOk(path, 'POST', fix))

const populateFields = (): void => {
  cy.getByTestId('nomeEmpresa').type(faker.name.findName())
  cy.getByTestId('email').type(faker.internet.email())
  const password = faker.internet.password(9)
  cy.getByTestId('password').type(password)
  cy.getByTestId('passwordConfirmation').type(password)
  cy.getByTestId('phone').type(faker.random.numeric(11))
}

const simulateValidSubmit = (): void => {
  cy.getByTestId('nomeEmpresa').type(faker.name.findName())
  cy.getByTestId('email').type(faker.internet.email())
  const password = faker.internet.password(9)
  cy.getByTestId('password').type(password)
  cy.getByTestId('passwordConfirmation').type(password)
  cy.getByTestId('phone').type(faker.random.numeric(11))
  cy.getByTestId('submit').click()
}
describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('should load Input with correct initial state ', () => {
    FormHelper.testInputContent('nomeEmpresa', '')
    FormHelper.testInputContent('email', '')
    FormHelper.testInputContent('password', '')
    FormHelper.testInputContent('passwordConfirmation', '')
    FormHelper.testInputContent('phone', '')
    cy.getByTestId('submit').click()
    FormHelper.testInputStatus('nomeEmpresa', 'Campo obrigatório')
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')
    FormHelper.testInputStatus('phone', 'Campo obrigatório')
  })

  it('should present error state if is invalid', () => {
    cy.getByTestId('nomeEmpresa').type(faker.random.alphaNumeric(3))
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(4))
    cy.getByTestId('phone').type(faker.random.numeric(4))
    cy.getByTestId('submit').click()
    FormHelper.testInputStatus('nomeEmpresa', 'Texto deve ter mínimo de 4 caracteres.')
    FormHelper.testInputStatus('email', 'Email invalido.')
    FormHelper.testInputStatus('password', 'Senha deve ter mínimo de 8 caracteres.')
    FormHelper.testInputStatus('passwordConfirmation', 'Senha deve ter mínimo de 8 caracteres.')
    FormHelper.testInputStatus('phone', 'Telefone invalido.')
  })

  it('should present valid state if is valid', () => {
    populateFields()
    cy.getByTestId('submit').click()
    FormHelper.testInputStatus('nomeEmpresa')
    FormHelper.testInputStatus('email')
    FormHelper.testInputStatus('password')
    FormHelper.testInputStatus('passwordConfirmation')
    FormHelper.testInputStatus('phone')
  })
  it('should present EmailInUseError on 403', () => {
    mockEmailInUseError()
    simulateValidSubmit()
    cy.get('#signupFormError').should('contain.text', 'Esse e-mail já esta em uso')
    Helper.testUrl('/signup')
  })

  it('should present UnexpectedError on default error cases', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    cy.get('#signupFormError').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
    Helper.testUrl('/signup')
  })

  // it('should present save accesstoken if valid cretendials are provided', () => {
  //   mockSuccess()
  //   simulateValidSubmit()
  //   Helper.testUrl('/')
  //   Helper.testLocalStorageItem('account')
  // })

  // it('should prevent multiple submits', () => {
  //   mockSuccess()
  //   populateFields()
  //   cy.getByTestId('submit').dblclick()
  //   cy.wait('@request')
  //   Helper.testHttpCallsCount(1)
  // })

  // it('should not call submit if form is invalid', () => {
  //   mockSuccess()
  //   cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
  //   Helper.testHttpCallsCount(0)
  // })
})
