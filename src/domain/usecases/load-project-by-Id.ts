import { ProjectModel } from '../models'

export interface LoadProjectById {
  loadById: (projectId: string) => Promise<LoadProjects.Model>
}

export namespace LoadProjects {
  export type Model = ProjectModel
}
