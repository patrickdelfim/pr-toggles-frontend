
import { createServer, Model, Response } from 'miragejs'

export function makeServer ({ environment = 'development' } = {}) {
  console.log('creation server')
  const server = createServer({
    models: {
      project: Model,
    },
    seeds (server) {
      server.create('project', { project_id: 1, client_id: 1, nome: 'back end do futuro', descricao: 'descricao linda do projeto', create_at: new Date(), updated_at: new Date() })
      server.create('project', { project_id: 2, client_id: 1, nome: 'back end do futuro 2', descricao: '', create_at: new Date(), updated_at: new Date() })
      server.create('project', { project_id: 3, client_id: 1, nome: 'back end do futuro 3', descricao: 'descricao linda do projeto 2', create_at: new Date(), updated_at: new Date() })
    },
    routes () {
      this.namespace = 'api'
      this.timing = 2000

      this.get('/projects', (schema, request) => {
        return schema.projects.all()
      })
      this.post('/project/create', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        console.log(attrs)
        const model = { project_id: 4, client_id: 1, nome: attrs.name, descricao: attrs.description, created_at: new Date(), updated_at: new Date() }
        schema.projects.create(model)
        return new Response(200, {}, [
          { message: 'projecto criado com sucesso' },
        ])
      })
    }

  })

  return server
}
