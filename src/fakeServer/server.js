
import { createServer, Model, Response } from 'miragejs'

export function makeServer ({ environment = 'development' } = {}) {
  console.log('creation server')
  const server = createServer({
    models: {
      project: Model,
    },
    seeds (server) {
      server.create('project', { projeto_id: 1, cliente_id: 1, nome: 'back end do futuro', descricao: 'descricao linda do projeto', created_at: new Date(), updated_at: new Date() })
      server.create('project', { projeto_id: 2, cliente_id: 1, nome: 'back end do futuro 2', descricao: '', created_at: new Date(), updated_at: new Date() })
      server.create('project', { projeto_id: 3, cliente_id: 1, nome: 'back end do futuro 3', descricao: 'descricao linda do projeto 2', created_at: new Date(), updated_at: new Date() })
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
        const model = { projeto_id: 4, cliente_id: 1, nome: attrs.nome, descricao: attrs.descricao, created_at: new Date(), updated_at: new Date() }
        schema.projects.create(model)
        return new Response(200, {}, { message: 'projeto criado com sucesso' },
        )
      })
    }

  })

  return server
}
