import { ProjectModel } from '../models'

export interface LoadProjectById {
  loadByProjectId: (projectId: string) => Promise<LoadProjects.Model>
}

export namespace LoadProjects {
  export type Model = ProjectModel
}
