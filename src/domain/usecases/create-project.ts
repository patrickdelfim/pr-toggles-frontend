
export type createProjectParams = {
  cliente_id: number
  nome: string
  descricao?: string
}

export interface CreateProject {
  create: (params: CreateProject.Params) => Promise<CreateProject.Model>
}

export namespace CreateProject {
  export type Params = createProjectParams
  export type Model = {message: string}
}
