import * as Helper from '../utils/helpers'

describe('Private Routes', () => {
  it('should logout if protected routes has no token', () => {
    cy.visit('/panel')
    Helper.testUrl('/login')
    cy.visit('/panel/project/2')
    Helper.testUrl('/login')
  })
})
