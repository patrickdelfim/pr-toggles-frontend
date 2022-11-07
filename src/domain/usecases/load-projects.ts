import { ProjectModel } from '@/domain/models'

export interface LoadProjects {
  loadAllByClientId: (idCliente: number) => Promise<LoadProjects.Model[]>
}

export namespace LoadProjects {
  export type Model = ProjectModel
}
