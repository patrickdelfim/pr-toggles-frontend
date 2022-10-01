import { CreateProject } from '@/domain/usecases'
import { queryClient } from '@/main/routes/router'
import CreateProjectService from '@/services/create-project-service'
import { useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'

function useCreateProject (): any {
  const createProjectService = new CreateProjectService()
  const toast = useToast()

  return useMutation(async (params: CreateProject.Params) => await createProjectService.create(params), {
    onSuccess: async () => {
      await queryClient.invalidateQueries('getProjects')
      toast({
        id: 'getProjectToast',
        title: 'Projeto criado com sucesso!',
        status: 'success',
        isClosable: true,
      })
    },
    onError: (error: Error) => {
      toast({
        id: 'getProjectToast',
        title: error.message || 'Algo inesperado aconteceu.',
        status: 'error',
        isClosable: true,
      })
    }
  })
}
export default useCreateProject
