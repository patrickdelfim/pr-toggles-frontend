import { ProjectModel } from '@/domain/models'

export type createProjectParams = {
  nome: string
  descricao: string
}

export interface CreateProject {
  create: (params: CreateProject.Params) => Promise<CreateProject.Model>
}

export namespace CreateProject {
  export type Params = createProjectParams
  export type Model = ProjectModel
}
