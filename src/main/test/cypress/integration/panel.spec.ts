import * as Helper from '../utils/helpers'
import { makeServer } from '../../../../fakeServer/server.js'
import { Response } from 'miragejs'
import * as FormHelper from '../utils/form-helpers'
import faker from '@faker-js/faker'

const path = /projetos\/cliente\/2/ // numero 2 é a cliente Id do accessToken. Access token inserido dentro do fixture
const pathCreateProject = /projetos/

describe('ProjectList', () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
    cy.fixture('account').then(account => Helper.SetLocalStorageItem('account', account))
  })

  afterEach(() => {
    server.shutdown()
  })
  it('should present error on UnexpectedError', () => {
    server.get(path, () => {
      return new Response(500, {}, {})
    })
    cy.visit('panel')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
  })

  it('should logou on AccessDeniedError', () => {
    server.get(path, () => {
      return new Response(403, {}, {})
    })
    cy.visit('panel')
    Helper.testUrl('/login')
  })

  // mover p teste unico de header
  it('should present correct username', () => {
    cy.visit('/login')
    const { name } = Helper.GetLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('should present project items', () => {
    server.timing = 2000
    cy.visit('panel')
    cy.getByTestId('skeletonCardList').children().should('have.length', 5)
    cy.getByTestId('projectsContainer').children().first().then(element => {
      assert.equal(element.find('[data-testid="title"]').text(), 'back end do futuro')
      assert.equal(element.find('[data-testid="subtitle"]').text(), `Created ${new Date().toLocaleDateString('pt-BR')} - descricao linda do projeto`)
    })
    cy.getByTestId('projectsContainer').children().eq(1).then(element => {
      assert.equal(element.find('[data-testid="title"]').text(), 'back end do futuro 2')
      assert.equal(element.find('[data-testid="subtitle"]').text(), `Created ${new Date().toLocaleDateString('pt-BR')} - Sem descrição`)
    })
    cy.getByTestId('projectsContainer').children().eq(2).then(element => {
      assert.equal(element.find('[data-testid="title"]').text(), 'back end do futuro 3')
      assert.equal(element.find('[data-testid="subtitle"]').text(), `Created ${new Date().toLocaleDateString('pt-BR')} - descricao linda do projeto 2`)
    })
  })
  it('should present not available projects message', () => {
    server.timing = 2000
    server.get(path, () => {
      return new Response(200, {}, [])
    })
    cy.visit('panel')
    cy.getByTestId('skeletonCardList').children().should('have.length', 5)
    cy.getByTestId('noProjectContainer').children().first().then(element => {
      assert.equal(element.find('[data-testid="title"]').text(), 'Parece que voce ainda não tem nenhum projeto.')
      assert.equal(element.find('[data-testid="subtitle"]').text(), 'Clique em Criar novo projeto para utilizar todo o potencial de PR toggles!')
    })
  })
  it('should search for a existing project', () => {
    cy.visit('panel')
    cy.getByTestId('searchInput').type('futuro 3')
    cy.getByTestId('projectsContainer').children().first().then(element => {
      assert.equal(element.find('[data-testid="title"]').text(), 'back end do futuro 3')
      assert.equal(element.find('[data-testid="subtitle"]').text(), `Created ${new Date().toLocaleDateString('pt-BR')} - descricao linda do projeto 2`)
    })
  })
  it('should fail when searching for an not existing project', () => {
    cy.visit('panel')
    cy.getByTestId('searchInput').type('futuro 30923910')
    cy.getByTestId('projectNotFoundSearchText').should('exist')
  })
})

const populateFields = (): void => {
  cy.getByTestId('nome').type(faker.company.companyName())
  cy.getByTestId('descricao').type(faker.lorem.words(5))
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}
describe('Add new project to project List', () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
    cy.fixture('account').then(account => Helper.SetLocalStorageItem('account', account))
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should open and close modal correctly', () => {
    cy.visit('panel')
    cy.getByTestId('openNewProjectModal').click()
    cy.getByTestId('modalHeader').should('exist')
    cy.getByTestId('closeNewProjectModal').click()
    cy.getByTestId('modalHeader').should('not.exist')
  })
  it('should present error if project state is invalid', () => {
    cy.visit('panel')
    cy.getByTestId('openNewProjectModal').click()
    cy.getByTestId('submit').click()
    FormHelper.testInputStatus('nome', 'Campo obrigatório')
  })
  it('should present error if project state is invalid', () => {
    cy.visit('panel')
    cy.getByTestId('openNewProjectModal').click()
    cy.getByTestId('submit').click()
    FormHelper.testInputStatus('nome', 'Campo obrigatório')
  })

  it('should present AccessDeniedError on 403', () => {
    cy.visit('panel')
    server.post(pathCreateProject, () => {
      return new Response(403, {}, {})
    })
    cy.getByTestId('openNewProjectModal').click()
    simulateValidSubmit()
    cy.get('#saveProjectError').should('contain.text', 'Acesso negado!')
  })

  it('should present UnexpectedError on default error cases', () => {
    cy.visit('panel')
    server.post(pathCreateProject, () => {
      return new Response(500, {}, {})
    })
    cy.getByTestId('openNewProjectModal').click()
    simulateValidSubmit()
    cy.get('#saveProjectError').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
  })
  it('should create new project correctly', () => {
    cy.visit('panel')
    cy.getByTestId('openNewProjectModal').click()
    const projectName = faker.company.companyName()
    const projectDesc = faker.lorem.words(5)
    cy.getByTestId('nome').type(projectName)
    cy.getByTestId('descricao').type(projectDesc)
    cy.getByTestId('submit').click()
    cy.get('#saveProjectSuccess').should('contain.text', 'Projeto criado com sucesso!')
    cy.getByTestId('projectsContainer').children().eq(3).then(element => {
      assert.equal(element.find('[data-testid="title"]').text(), projectName)
      assert.equal(element.find('[data-testid="subtitle"]').text(), `Created ${new Date().toLocaleDateString('pt-BR')} - ${projectDesc}`)
    })
  })
})
