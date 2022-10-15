import axios, { AxiosResponse } from 'axios'

export const makeApiUrl = (path: string): string => {
  return `${process.env.API_URL}${path}`
}

export const makeRequest = async (data: HttpRequest): Promise<HttpResponse> => {
  let axiosResponse: AxiosResponse
  try {
    axiosResponse = await axios.request({
      url: data.url,
      method: data.method,
      data: data.body,
      headers: data.headers
    })
  } catch (error) {
    axiosResponse = error.response
  }
  return {
    statusCode: axiosResponse.status,
    body: axiosResponse.data
  }
}

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}
export type HttpMethod = 'post' | 'get' | 'put' | 'patch' | 'delete'

export enum HttpStatusCode{
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}
