import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { CreateAgregado } from '@/domain/usecases/create-agregado'
import { HttpStatusCode, makeApiUrl, makeRequest } from './api-service'

export default class CreateAgregadoService implements CreateAgregado {
  async create (params: CreateAgregado.Params): Promise<CreateAgregado.Model> {
    console.log('starting create Agregado service')
    const httpResponse = await makeRequest({
      url: makeApiUrl('/api/agregados'),
      method: 'post',
      body: params,
    })
    console.log(httpResponse.body)
    switch (httpResponse.statusCode) {
      case HttpStatusCode.created: return httpResponse.body
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}
