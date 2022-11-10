import faker from '@faker-js/faker'
import * as FormHelper from '../utils/form-helpers'
import * as Helper from '../utils/helpers'
import { makeServer } from '../../../../fakeServer/server.js'
import { Response } from 'miragejs'

const path = /auth\/login/

const populateFields = (): void => {
  cy.getByTestId('username').type(faker.internet.email())
  cy.getByTestId('password').type(faker.internet.password(9))
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('login', () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
    if (Cypress.currentTest.title === 'should navigate to Panel page when account already defined') return
    cy.visit('login')
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should load Input with correct initial state ', () => {
    FormHelper.testInputContent('username', '')
    FormHelper.testInputContent('password', '')
    cy.getByTestId('submit').click()
    FormHelper.testInputStatus('username', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
  })

  it('should present error state if is invalid', () => {
    cy.getByTestId('username').type(faker.random.alpha(10))
    cy.getByTestId('submit').click()
    FormHelper.testInputStatus('username', 'Email invalido.')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
  })

  it('should present valid state if is valid', () => {
    server.timing = 2000
    populateFields()
    cy.getByTestId('submit').click()
    FormHelper.testInputStatus('username')
    FormHelper.testInputStatus('password')
  })
  it('should present InvalidCredentialsError on 401', () => {
    server.post(path, () => {
      return new Response(401, {}, {})
    })
    simulateValidSubmit()
    cy.get('#loginFormError').should('contain.text', 'Credenciais inválidas')
    Helper.testUrl('/login')
  })

  it('should present UnexpectedError on default error cases', () => {
    server.post(path, () => {
      return new Response(500, {}, {})
    })
    simulateValidSubmit()
    cy.get('#loginFormError').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
    Helper.testUrl('/login')
  })

  it('should present save accesstoken if valid cretendials are provided', () => {
    simulateValidSubmit()
    Helper.testUrl('/panel')
    Helper.testLocalStorageItem('account')
  })

  it('should navigate to signup page when clicking signup btn', () => {
    cy.getByTestId('signupBtn').click()
    Helper.testUrl('/cliente')
  })
  it('should navigate to Panel page when account already defined', () => {
    Helper.SetLocalStorageItem('account', { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNpY2xhbm9AZ21haWwuY29tIiwic3ViIjoxLCJuYW1lIjoiQ2ljbGFubyBkYSBTaWx2YSIsImNsaWVudGVfaWQiOjIsImlhdCI6MTY2NzM1NjMwMX0.HgvwjoDIK-UisH5w7_eOcKo1mp_dOx0CytghEF4SIyE', name: 'myCompany' })
    cy.visit('login')
    Helper.testUrl('/panel')
  })
})
