import faker from '@faker-js/faker'
import * as FormHelper from '../utils/form-helpers'
import * as Helper from '../utils/helpers'

import { makeServer } from '../../../../fakeServer/server.js'
import { Response } from 'miragejs'

const path = /clientes/

const populateFields = (): void => {
  cy.getByTestId('nome_cliente').type(faker.name.findName())
  cy.getByTestId('email').type(faker.internet.email())
  const senha = faker.internet.password(9)
  cy.getByTestId('senha').type(senha)
  cy.getByTestId('confirmacao_senha').type(senha)
  cy.getByTestId('nome_usuario').type(faker.name.findName())
}

const simulateValidSubmit = (): void => {
  cy.getByTestId('nome_cliente').type(faker.name.findName())
  cy.getByTestId('email').type(faker.internet.email())
  const senha = faker.internet.password(9)
  cy.getByTestId('senha').type(senha)
  cy.getByTestId('confirmacao_senha').type(senha)
  cy.getByTestId('nome_usuario').type(faker.name.findName())
  cy.getByTestId('submit').click()
}
describe('Cliente', () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
    if (Cypress.currentTest.title === 'should navigate to Panel page when account already defined') return
    cy.visit('cliente')
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should load Input with correct initial state ', () => {
    FormHelper.testInputContent('nome_cliente', '')
    FormHelper.testInputContent('email', '')
    FormHelper.testInputContent('senha', '')
    FormHelper.testInputContent('confirmacao_senha', '')
    FormHelper.testInputContent('nome_usuario', '')
    cy.getByTestId('submit').click()
    FormHelper.testInputStatus('nome_usuario', 'Campo obrigatório')
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    FormHelper.testInputStatus('senha', 'Campo obrigatório')
    FormHelper.testInputStatus('confirmacao_senha', 'Campo obrigatório')
    FormHelper.testInputStatus('nome_usuario', 'Campo obrigatório')
  })

  it('should present error state if is invalid', () => {
    cy.getByTestId('nome_cliente').type(faker.random.alphaNumeric(3))
    cy.getByTestId('nome_usuario').type(faker.random.numeric(3))
    cy.getByTestId('email').type(faker.random.alphaNumeric(10))
    cy.getByTestId('senha').type(faker.random.alphaNumeric(3))
    cy.getByTestId('confirmacao_senha').type(faker.random.alphaNumeric(4))
    cy.getByTestId('submit').click()
    FormHelper.testInputStatus('nome_cliente', 'Campo deve ter mínimo de 4 caracteres.')
    FormHelper.testInputStatus('email', 'Email invalido.')
    FormHelper.testInputStatus('senha', 'Campo deve ter mínimo de 8 caracteres.')
    FormHelper.testInputStatus('confirmacao_senha', 'Campo deve ter mínimo de 8 caracteres.')
    FormHelper.testInputStatus('nome_usuario', 'Campo deve ter mínimo de 4 caracteres.')
  })

  it('should present valid state if is valid', () => {
    server.timing = 2000
    populateFields()
    cy.getByTestId('submit').click()
    FormHelper.testInputStatus('nome_cliente')
    FormHelper.testInputStatus('email')
    FormHelper.testInputStatus('senha')
    FormHelper.testInputStatus('confirmacao_senha')
    FormHelper.testInputStatus('nome_usuario')
  })
  it('should present EmailInUseError on 403', () => {
    server.post(path, () => {
      return new Response(403, {}, {})
    })
    simulateValidSubmit()
    cy.get('#signupFormError').should('contain.text', 'Esse e-mail já esta em uso')
    Helper.testUrl('/cliente')
  })

  it('should present UnexpectedError on default error cases', () => {
    server.post(path, () => {
      return new Response(500, {}, {})
    })
    simulateValidSubmit()
    cy.get('#signupFormError').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
    Helper.testUrl('/cliente')
  })

  it('should save accesstoken if valid cretendials are provided', () => {
    simulateValidSubmit()
    Helper.testUrl('/panel')
    Helper.testLocalStorageItem('account')
  })

  it('should navigate to login page when clicking Login btn', () => {
    cy.getByTestId('loginBtn').click()
    Helper.testUrl('/login')
  })
  it('should navigate to Panel page when account already defined', () => {
    Helper.SetLocalStorageItem('account', { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNpY2xhbm9AZ21haWwuY29tIiwic3ViIjoxLCJuYW1lIjoiQ2ljbGFubyBkYSBTaWx2YSIsImNsaWVudGVfaWQiOjIsImlhdCI6MTY2NzM1NjMwMX0.HgvwjoDIK-UisH5w7_eOcKo1mp_dOx0CytghEF4SIyE', name: 'myCompany' })
    cy.visit('cliente')
    Helper.testUrl('/panel')
  })
})
