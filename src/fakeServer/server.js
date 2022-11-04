
import { belongsTo, createServer, hasMany, Model, Response, RestSerializer, } from 'miragejs'

export function makeServer ({ environment = 'development' } = {}) {
  console.log('creation server')
  const server = createServer({
    trackRequests: true,
    serializers: {
      project: RestSerializer.extend({
        keyForAttribute (key) {
          return key === 'id' ? 'projeto_id' : key
        },
      }),
      // agregado: RestSerializer.extend({
      //   keyForRelationship (key) {
      //     return key === 'projectId' ? 'projeto_id' : key
      //   },
      // })
    },
    models: {
      project: Model,
      feature: Model.extend({
        strategy: hasMany(),
      }),
      strategy: Model.extend({
        feature: belongsTo(),
      }),
      agregado: Model.extend({
        project: belongsTo()
      })
    },
    seeds (server) {
      server.create('project', { projeto_id: 1, cliente_id: 1, nome: 'back end do futuro', descricao: 'descricao linda do projeto', created_at: new Date(), updated_at: new Date() })
      server.create('project', { projeto_id: 2, cliente_id: 1, nome: 'back end do futuro 2', descricao: '', created_at: new Date(), updated_at: new Date() })
      server.create('project', { projeto_id: 3, cliente_id: 1, nome: 'back end do futuro 3', descricao: 'descricao linda do projeto 2', created_at: new Date(), updated_at: new Date() })
      const chatBot = server.create('feature', { projeto_id: '3', nome: 'chatBot', descricao: 'liberação gradual de chatbot', ativada_prod: false, ativada_homolog: false, ativada_dev: true, estrategias: null, created_at: new Date(), updated_at: new Date() })
      server.create('strategy', { feature: chatBot, funcionalidade_id: chatBot.id, ambiente: 'dev', valor: true, variacoes: [] })
      server.create('strategy', { feature: chatBot, funcionalidade_id: chatBot.id, ambiente: 'homolog', valor: false, variacoes: [] })
      server.create('strategy', { feature: chatBot, funcionalidade_id: chatBot.id, ambiente: 'prod', valor: 'trds', variacoes: [{ valor: 'blabla', peso: 10 }, { valor: 'salaz', peso: 20 }] })
      const natal = server.create('feature', { projeto_id: '3', nome: 'Layout especial de natal', descricao: '', ativada_prod: true, ativada_homolog: true, ativada_dev: false, estrategias: null, created_at: new Date(), updated_at: new Date() })
      server.create('strategy', { feature: natal, funcionalidade_id: natal.id, ambiente: 'dev', valor: 55, variacoes: [] })
      server.create('strategy', { feature: natal, funcionalidade_id: natal.id, ambiente: 'homolog', valor: 32, variacoes: [] })
      server.create('strategy', { feature: natal, funcionalidade_id: natal.id, ambiente: 'prod', valor: 100, variacoes: [{ valor: 120, peso: 60 }, { valor: 130, peso: 20 }] })
      server.create('agregado', { projectId: 3, nome: 'grupo_A', descricao: 'grupo do tipo 1 de agregados', regras: [], created_at: new Date(), updated_at: new Date() })
      server.create('agregado', { projectId: 3, nome: 'moradores_RJ', descricao: 'grupo dos moradores do rj de agregados', regras: [], created_at: new Date(), updated_at: new Date() })
      server.create('agregado', { projectId: 3, nome: 'clientes_em_potencial', descricao: '', regras: [], created_at: new Date(), updated_at: new Date() })
      server.create('agregado', { projectId: 3, nome: 'adm_sis', descricao: 'grupo Adms', regras: [], created_at: new Date(), updated_at: new Date() })
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

      this.get('/projects/:id/features', async (schema, request) => {
        const id = request.params.id
        const features = await schema.features.where({ projeto_id: id })
        if (features.length === 0) return new Response(400, {}, { message: 'Error ao buscar feature' })
        const responsePayload = []
        features.models.forEach(feat => {
          const featureWithStrategies = { ...feat.attrs, estrategias: extractStrategyFromFeatureObject(feat) }
          delete featureWithStrategies.strategyIds
          responsePayload.push(featureWithStrategies)
        })
        console.log(responsePayload)
        return { features: responsePayload }
      })

      this.patch('/features/:featureId', async (schema, request) => {
        // TODO: INCLUIR A EDICAO DE ESTRATEGIAS NESSE PATH
        console.log('server: start update feature')
        const featureEditableSchema = ['ativada_prod', 'ativada_homolog', 'ativada_dev', 'descricao']
        const strategyEditableSchema = ['valor', 'variacoes']
        const featureId = request.params.featureId
        const body = JSON.parse(request.requestBody)
        const feature = await schema.features.findBy({ id: featureId })
        if (!feature) return new Response(400, {}, { message: 'funcionalidade nao existe.' })

        // EDIT FEATURE SECTION
        const fieldsToUpdate = {}
        for (const field of featureEditableSchema) {
          if (Object.keys(body).includes(field)) {
            Object.assign(fieldsToUpdate, { [field]: body[field] })
          }
        }
        const strategyToUpdate = {}
        if (body?.estrategia) {
          for (const field of strategyEditableSchema) {
            if (Object.keys(body?.estrategia).includes(field)) {
              Object.assign(strategyToUpdate, { [field]: body.estrategia[field] })
            }
          }
        }
        if (Object.keys(fieldsToUpdate).length === 0 && Object.keys(strategyToUpdate).length === 0) return new Response(400, {}, { message: 'Nenhum campo foi atualizado.' })

        await feature.update(fieldsToUpdate)
        // Edit STRATEGY SECTION
        if (body?.estrategia?.id && Object.keys(strategyToUpdate).length !== 0) {
          const estrategia = await schema.strategies.findBy({ id: body?.estrategia?.id })
          if (estrategia.attrs.funcionalidade_id === feature.attrs.id) {
            estrategia.update(strategyToUpdate)
          }
        }

        // Return updated feature
        const updatedFeature = await schema.features.findBy({ id: featureId })
        const response = { ...updatedFeature.attrs, estrategias: extractStrategyFromFeatureObject(updatedFeature) }
        delete response.strategyIds
        return { feature: response }
      })

      this.post('/feature', async (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        console.log('attr values: ', attrs)
        const model = { projeto_id: attrs.projeto_id, nome: attrs.nome, descricao: attrs.descricao, estrategias: [], ativada_prod: true, ativada_homolog: true, ativada_dev: true, created_at: new Date(), updated_at: new Date() }
        console.log('feature model: ', model)
        const feature = await schema.features.create(model)
        console.log('criando ambiente...')

        console.log('criando ambiente ', 'dev')
        const estrategiaDev = await schema.strategies.create({ funcionalidade_id: feature.id, ambiente: 'dev', valor: attrs.valor, variacoes: [...attrs.variacoes] })
        console.log('criando ambiente ', 'hml')
        const estrategiaHml = await schema.strategies.create({ funcionalidade_id: feature.id, ambiente: 'hml', valor: attrs.valor, variacoes: [...attrs.variacoes] })
        console.log('criando ambiente ', 'prd')
        const estrategiaPrd = await schema.strategies.create({ funcionalidade_id: feature.id, ambiente: 'prd', valor: attrs.valor, variacoes: [...attrs.variacoes] })

        await feature.update({ estrategias: [estrategiaDev.id, estrategiaHml.id, estrategiaPrd.id] })
        console.log(feature)
        return new Response(200, {}, { message: 'Feature criada com sucesso' },
        )
      })

      /* ==========================
              Agregados
        ========================== */

      this.post('/agregado', async (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        console.log('attr values: ', attrs)
        const model = { projectId: attrs.projeto_id, nome: attrs.nome, descricao: attrs.descricao, regras: attrs.regras, created_at: new Date(), updated_at: new Date() }
        console.log('agregado model: ', model)
        const agregado = await schema.agregados.create(model)
        console.log('added agregado: ', agregado)
        return new Response(200, {}, { message: 'Agregado criada com sucesso' },
        )
      })

      this.get('/projects/:id/agregados', async (schema, request) => {
        const id = request.params.id
        const agregados = await schema.agregados.where({ projectId: id })
        if (agregados.length === 0) return new Response(400, {}, { message: 'Error ao buscar agregados.' })
        return agregados
      })
    }

  })

  return server
}

const extractStrategyFromFeatureObject = (feature) => {
  const estrategias = []
  feature.strategy.models.forEach(estrategia => estrategias.push(estrategia.attrs))
  const featureWithStrategies = { ...feature.attrs, estrategias }
  delete featureWithStrategies.strategyIds
  return estrategias
}
