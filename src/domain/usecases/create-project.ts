import { ProjectModel } from '@/domain/models'

export type createProjectParams = {
  name: string
  description: string

}

export interface CreateProject {
  add: (params: CreateProject.Params) => Promise<CreateProject.Model>
}

export namespace CreateProject {
  export type Params = createProjectParams
  export type Model = ProjectModel
}
