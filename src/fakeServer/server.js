
import { createServer, Model, Response, RestSerializer, } from 'miragejs'

export function makeServer ({ environment = 'development' } = {}) {
  console.log('creation server')
  const server = createServer({
    trackRequests: true,
    serializers: {
      project: RestSerializer.extend({
        keyForAttribute (key) {
          return key === 'id' ? 'projeto_id' : key
        },
      })
    },
    models: {
      project: Model,
      feature: Model,
    },
    seeds (server) {
      server.create('project', { projeto_id: 1, cliente_id: 1, nome: 'back end do futuro', descricao: 'descricao linda do projeto', created_at: new Date(), updated_at: new Date() })
      server.create('project', { projeto_id: 2, cliente_id: 1, nome: 'back end do futuro 2', descricao: '', created_at: new Date(), updated_at: new Date() })
      server.create('project', { projeto_id: 3, cliente_id: 1, nome: 'back end do futuro 3', descricao: 'descricao linda do projeto 2', created_at: new Date(), updated_at: new Date() })
      server.create('feature', { projeto_id: 3, nome: 'chatBot', descricao: 'liberação gradual de chatbot', ativada_prod: false, ativada_homolog: false, ativada_dev: true, estrategias: null, created_at: new Date(), updated_at: new Date() })
    },
    routes () {
      this.namespace = 'api'
      this.timing = environment === 'test' ? 0 : 2000

      /* ==========================
                LOGIN AND AUTH
         ========================== */
      this.post('/auth/', async (schema, request) => {
        return new Response(200, {}, {
          // deepcode ignore HardcodedNonCryptoSecret: <please specify a reason of ignoring this>
          accessToken: 'any_token',
          name: 'empresa do patrick'
        },
        )
      })
      this.post('/signup/', async (schema, request) => {
        return new Response(200, {}, {
          // deepcode ignore HardcodedNonCryptoSecret: <please specify a reason of ignoring this>
          accessToken: 'any_token',
          name: 'empresa do patrick'
        },
        )
      })

      /* ==========================
                PROJECTS
         ========================== */

      this.get('/projects', (schema, request) => {
        return schema.projects.all()
      })

      this.get('/projects/:id', (schema, request) => {
        const id = request.params.id
        return schema.projects.findBy({ projeto_id: id })
      })

      this.post('/project/create', async (schema, request) => {
        const attrs = JSON.parse(request.requestBody)

        const model = { cliente_id: 1, nome: attrs.nome, descricao: attrs.descricao, created_at: new Date(), updated_at: new Date() }
        schema.projects.create(model)
        return new Response(200, {}, { message: 'projeto criado com sucesso' },
        )
      })

      /* ==========================
                FEATURES
         ========================== */

      this.get('/projects/:id/features', (schema, request) => {
        const id = request.params.id
        console.log('server: ', id)
        return schema.features.where({ projeto_id: id })
      })

      this.patch('/api/features/:featureId', async (schema, request) => {
        const featureEditableSchema = ['ativada_prod', 'ativada_homolog', 'ativada_dev']
        const featureId = request.params.featureId
        const body = request.body
        const feature = await schema.features.findBy({ id: featureId })

        if (!feature) return new Response(400, {}, { message: 'funcionalidade nao existe.' })
        const fieldsToUpdate = {}
        for (const field of featureEditableSchema) {
          if (Object.keys(body).includes(field)) {
            Object.assign(fieldsToUpdate, { field: body[field] })
          }
        }
        if (Object.key(fieldsToUpdate).length === 0) return new Response(400, {}, { message: 'Nenhum campo foi atualizado.' })

        await feature.update(fieldsToUpdate)
        return schema.features.findBy({ id: featureId })
      })
    }

  })

  return server
}
