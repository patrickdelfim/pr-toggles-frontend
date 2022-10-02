import { CreateProject } from '@/domain/usecases'
import { queryClient } from '@/main/routes/router'
import CreateProjectService from '@/services/create-project-service'
import { useMutation } from 'react-query'

function useCreateProject (onSuccessAction, onErrorAction): any {
  const createProjectService = new CreateProjectService()

  return useMutation(async (params: CreateProject.Params) => await createProjectService.create(params), {
    onSuccess: async () => {
      await queryClient.invalidateQueries('projects')
      onSuccessAction()
    },
    onError: (error: Error) => {
      onErrorAction(error)
    }
  })
}
export default useCreateProject
