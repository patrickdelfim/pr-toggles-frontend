import { ProjectModel } from '@/domain/models'

export interface LoadProjects {
  loadAllByClientId: (idCliente: string) => Promise<LoadProjects.Model[]>
}

export namespace LoadProjects {
  export type Model = ProjectModel
}
