import { ProjectModel } from '@/domain/models'

export interface LoadProjects {
  load: () => Promise<LoadProjects.Model[]>
}

export namespace LoadProjects {
  export type Model = ProjectModel
}
