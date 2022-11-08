
import { belongsTo, createServer, hasMany, Model, Response, RestSerializer, Serializer, } from 'miragejs'

const ApplicationSerializer = Serializer.extend({
  // will always serialize the ids of all relationships for the model or collection in the response
  serializeIds: 'always',

  serialize (resource, request) {
    const json = Serializer.prototype.serialize.apply(this, arguments)

    const root = resource.models ? this.keyForCollection(resource.modelName) : this.keyForModel(resource.modelName)
    return json[root]
  }
})

export function makeServer ({ environment = 'development' } = {}) {
  console.log('creation server')
  const server = createServer({
    trackRequests: true,
    serializers: {
      project: RestSerializer.extend({
        embed: true,
        root: false,
        keyForAttribute (key) {
          return key === 'id' ? 'projeto_id' : key
        },
      }),
      feature: RestSerializer.extend({
        embed: true,
        root: false,
        keyForAttribute (key) {
          return key === 'projetoId' ? 'projeto_id' : key
        },
        keyForForeignKey (key) {
          if (key === 'projetoId') {
            return 'projeto_id'
          }
          return key
        },
      }),
      // agregado: RestSerializer.extend({
      //   keyForRelationship (key) {
      //     return key === 'projectId' ? 'projeto_id' : key
      //   },
      // })
      strategyHasAgregado: ApplicationSerializer.extend({
        keyForForeignKey (key) {
          if (key === 'strategy') {
            return 'estrategia_id'
          }
          if (key === 'agregado') {
            return 'agregado_id'
          }
          return key
        },
      })

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
      }),
      strategyHasAgregado: Model.extend({
        agregado: belongsTo(),
        strategy: belongsTo()
      })
    },
    seeds (server) {
      server.create('project', { id: 1, cliente_id: 1, nome: 'back end do futuro', descricao: 'descricao linda do projeto', created_at: new Date(), updated_at: new Date() })
      server.create('project', { id: 2, cliente_id: 1, nome: 'back end do futuro 2', descricao: '', created_at: new Date(), updated_at: new Date() })
      server.create('project', { id: 3, cliente_id: 1, nome: 'back end do futuro 3', descricao: 'descricao linda do projeto 2', created_at: new Date(), updated_at: new Date() })
      const chatBot = server.create('feature', { projeto_id: '3', nome: 'chatBot', descricao: 'liberação gradual de chatbot', ativada_prod: false, ativada_homolog: false, ativada_dev: true, estrategias: null, created_at: new Date(), updated_at: new Date() })
      server.create('strategy', { feature: chatBot, featureId: chatBot.id, ambiente: 'dev', valor: true, variacoes: [] })
      server.create('strategy', { feature: chatBot, featureId: chatBot.id, ambiente: 'homolog', valor: false, variacoes: [] })
      server.create('strategy', { feature: chatBot, featureId: chatBot.id, ambiente: 'prod', valor: 'trds', variacoes: [{ valor: 'blabla', peso: 10 }, { valor: 'salaz', peso: 20 }] })
      const natal = server.create('feature', { projeto_id: '3', nome: 'Layout especial de natal', descricao: '', ativada_prod: true, ativada_homolog: true, ativada_dev: false, estrategias: null, created_at: new Date(), updated_at: new Date() })
      const devStrategy = server.create('strategy', { feature: natal, featureId: natal.id, ambiente: 'dev', valor: 55, variacoes: [] })
      server.create('strategy', { feature: natal, featureId: natal.id, ambiente: 'homolog', valor: 32, variacoes: [] })
      server.create('strategy', { feature: natal, featureId: natal.id, ambiente: 'prod', valor: 100, variacoes: [{ valor: 120, peso: 60 }, { valor: 130, peso: 20 }] })
      server.create('agregado', { projectId: 3, nome: 'grupo_A', descricao: 'grupo do tipo 1 de agregados', regras: [], created_at: new Date(), updated_at: new Date() })
      server.create('agregado', { projectId: 3, nome: 'moradores_RJ', descricao: 'grupo dos moradores do rj de agregados', regras: [], created_at: new Date(), updated_at: new Date() })
      server.create('agregado', { projectId: 3, nome: 'clientes_em_potencial', descricao: '', regras: [], created_at: new Date(), updated_at: new Date() })
      const adminSisAgrr = server.create('agregado', { projectId: 3, nome: 'adm_sis', descricao: 'grupo Adms', regras: [], created_at: new Date(), updated_at: new Date() })
      server.create('strategyHasAgregado', { strategy: devStrategy, agregado: adminSisAgrr, agregado_id: adminSisAgrr.id, estrategia_id: devStrategy.id, ativado: true, valor: 100, variacoes: [{ valor: 120, peso: 60 }, { valor: 130, peso: 20 }] })
    },
    routes () {
      this.namespace = 'api'
      this.timing = environment === 'test' ? 0 : 2000

      /* ==========================
                LOGIN AND AUTH
         ========================== */
      this.post('/auth/login', async (schema, request) => {
        return new Response(200, {}, {
          // deepcode ignore HardcodedNonCryptoSecret: <please specify a reason of ignoring this>
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNpY2xhbm9AZ21haWwuY29tIiwic3ViIjoxLCJuYW1lIjoiQ2ljbGFubyBkYSBTaWx2YSIsImNsaWVudGVfaWQiOjIsImlhdCI6MTY2NzM1NjMwMX0.HgvwjoDIK-UisH5w7_eOcKo1mp_dOx0CytghEF4SIyE',
          name: 'empresa do patrick'
        },
        )
      })
      this.post('/cliente/', async (schema, request) => {
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

      this.get('/projetos/cliente/:id', (schema, request) => {
        return schema.projects.all()
      })

      this.get('/projetos/:id', async (schema, request) => {
        const id = request.params.id
        const project = await schema.projects.findBy({ id })
        if (!project) {
          return new Response(404, {}, { message: 'Projeto não encontrado.' },
          )
        }
        return project
      })

      this.post('/projetos', async (schema, request) => {
        const attrs = JSON.parse(request.requestBody)

        const model = { cliente_id: attrs.cliente_id, nome: attrs.nome, descricao: attrs.descricao, created_at: new Date(), updated_at: new Date() }
        schema.projects.create(model)
        return new Response(200, {}, { message: 'projeto criado com sucesso' },
        )
      })

      /* ==========================
                FEATURES
         ========================== */

      this.get('/funcionalidades/projeto/:id', async (schema, request) => {
        const id = request.params.id
        const features = await schema.features.where({ projeto_id: id })
        if (features.length === 0) return new Response(404, {}, { message: 'Features não encontrada.' })
        const responsePayload = []
        features.models.forEach(feat => {
          const featureWithStrategies = { ...feat.attrs, estrategias: extractStrategyFromFeatureObject(feat) }
          delete featureWithStrategies.strategyIds
          responsePayload.push(featureWithStrategies)
        })
        return responsePayload
      })

      this.patch('/funcionalidades/:featureId', async (schema, request) => {
        // TODO: INCLUIR A EDICAO DE ESTRATEGIAS NESSE PATH
        console.log('server: start update feature')
        const featureEditableSchema = ['ativada_prod', 'ativada_homolog', 'ativada_dev', 'descricao']
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
        if (Object.keys(fieldsToUpdate).length !== 0) {
          await feature.update(fieldsToUpdate)
        }

        // Return updated feature
        const updatedFeature = await schema.features.findBy({ id: featureId })
        return updatedFeature
      })

      this.post('/funcionalidades', async (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        console.log('attr values: ', attrs)
        const model = { projeto_id: attrs.projeto_id, nome: attrs.nome, descricao: attrs.descricao, estrategias: [], ativada_prod: true, ativada_homolog: true, ativada_dev: true, created_at: new Date(), updated_at: new Date() }
        console.log('feature model: ', model)
        const feature = await schema.features.create(model)
        console.log('criando ambiente...')

        console.log('criando ambiente ', 'dev')
        const estrategiaDev = await schema.strategies.create({ featureId: feature.id, ambiente: 'dev', valor: attrs.valor, variacoes: [...attrs.variacoes] })
        console.log('criando ambiente ', 'hml')
        const estrategiaHml = await schema.strategies.create({ featureId: feature.id, ambiente: 'homolog', valor: attrs.valor, variacoes: [...attrs.variacoes] })
        console.log('criando ambiente ', 'prd')
        const estrategiaPrd = await schema.strategies.create({ featureId: feature.id, ambiente: 'prod', valor: attrs.valor, variacoes: [...attrs.variacoes] })

        await feature.update({ strategyIds: [estrategiaDev.id, estrategiaHml.id, estrategiaPrd.id] })
        console.log(feature)
        return new Response(200, {}, { message: 'Feature criada com sucesso' },
        )
      })

      /* ==========================
                STRATEGY
         ========================== */

      this.patch('/estrategias/:estrategiaId', async (schema, request) => {
        console.log('server: start update feature')
        const strategyEditableSchema = ['valor', 'variacoes']
        const body = JSON.parse(request.requestBody)

        const strategyToUpdate = {}

        for (const field of strategyEditableSchema) {
          if (Object.keys(body).includes(field)) {
            Object.assign(strategyToUpdate, { [field]: body[field] })
          }
        }

        if (Object.keys(strategyToUpdate).length === 0) return new Response(400, {}, { message: 'Nenhum campo foi atualizado.' })

        // Edit STRATEGY SECTION
        if (body?.id && Object.keys(strategyToUpdate).length !== 0) {
          const estrategia = await schema.strategies.findBy({ id: body.id })
          const updatedStrategy = await estrategia.update(strategyToUpdate)
          return updatedStrategy
        }

        return new Response(500, {}, { message: 'Error.' },
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
        if (agregados.length === 0) return new Response(404, {}, { message: 'Error ao buscar agregados.' })
        return agregados
      })

      /* ==========================
              StrategyHasAgregado
        ========================== */

      this.put('/strategyHasAgregado', async (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        const strategyHasAgregado = await schema.strategyHasAgregados.where({ strategyId: attrs.estrategia_id })
        if (strategyHasAgregado.models.length > 0) {
          console.log('atualizando strategyHasAgregado.')
          const newUpdatedModel = { agregadoId: attrs.agregado_id, ativado: attrs.ativado, valor: attrs.valor, variacoes: attrs.variacoes, updated_at: new Date() }
          await strategyHasAgregado.update({ ...newUpdatedModel })
          return new Response(200, {}, { message: 'strategyHasAgregado atualizado com sucesso' },
          )
        } else {
          console.log('criandoStrategy has agregado')
          const model = { agregadoId: attrs.agregado_id, strategyId: attrs.estrategia_id, ativado: attrs.ativado, valor: attrs.valor, variacoes: attrs.variacoes, created_at: new Date(), updated_at: new Date() }
          await schema.strategyHasAgregados.create(model)
          return new Response(200, {}, { message: 'strategyHasAgregado criado com sucesso' },
          )
        }
      })

      this.get('estrategiaHasAgregado/:strategyId', async (schema, request) => {
        const strategyId = request.params.strategyId
        const agregado = await schema.strategyHasAgregados.findBy({ strategyId })
        console.log('agregado found: ', agregado)
        if (!agregado) return new Response(404, {}, { message: 'Error ao buscar agregados.' })
        return agregado
      })
    }

  })

  return server
}

const extractStrategyFromFeatureObject = (feature) => {
  const estrategias = []
  feature.strategy.models.forEach(estrategia => {
    const newObj = { ...estrategia.attrs, funcionalidade_id: estrategia.attrs.featureId }
    delete newObj.featureId
    estrategias.push(newObj)
  })
  const featureWithStrategies = { ...feature.attrs, estrategias }
  delete featureWithStrategies.strategyIds
  return estrategias
}
