import { CredentialsModel } from '../models/projectCredentials-model'

export interface LoadProjectCredentialByProjectId {
  loadByProjectId: (projectId: string) => Promise<LoadProjectCredentialByProjectId.Model>
}

export namespace LoadProjectCredentialByProjectId {
  export type Model = CredentialsModel[]
}
