import { CreateProject } from '@/domain/usecases'
import TextAreaField from '@/presentation/components/textAreaField/textAreaField'
import createProjectValidators from '@/presentation/validators/create-project-validators'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormField from '@/presentation/components/formField/formField'
import useCreateProject from '@/presentation/hooks/useCreateProject'

type props = {
  isOpen: boolean
  onClose: () => void
}

const CreateProjectModal: React.FC<props> = ({ isOpen, onClose }: props) => {
  const toast = useToast()
  const handleCloseModal = (): void => {
    resetField('nome')
    resetField('descricao')
    onClose()
  }

  const onSuccess = async (): Promise<void> => {
    toast({
      id: 'saveProjectSuccess',
      title: 'Projeto criado com sucesso!',
      status: 'success',
      isClosable: true,
    })
    resetField('nome')
    resetField('descricao')
    onClose()
  }

  const onError = async (error: Error): Promise<void> => {
    toast({
      id: 'saveProjectError',
      title: error.message || 'Algo inesperado aconteceu.',
      status: 'error',
      isClosable: true,
    })
  }

  const createProjectMutation = useCreateProject(onSuccess, onError)

  const {
    handleSubmit,
    register,
    resetField,
    control,
    getValues,
    formState: { errors },
  } = useForm<CreateProject.Params>({
    defaultValues: {
      nome: '',
      descricao: '',
    },
  })

  const validators = createProjectValidators(getValues)

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    handleSubmit(createNewProject)(event)
  }

  const createNewProject: SubmitHandler<CreateProject.Params> = async (
    values: CreateProject.Params
  ) => {
    createProjectMutation.mutate(values)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size={'6xl'} closeOnOverlayClick={!createProjectMutation.isLoading}>
      <ModalOverlay />
      <ModalContent justifyContent="center">
        <ModalHeader data-testid="modalHeader">Cadastrar novo projeto.</ModalHeader>
        <ModalCloseButton data-testid="closeNewProjectModal" disabled={createProjectMutation.isLoading}/>
        <ModalBody>
          <form
            id="createProjectForm"
            autoComplete="off"
            onSubmit={handleSubmitForm}
          >
            <FormField
              fieldName="Nome do projeto"
              fieldKey="nome"
              placeholder="Ex: backend revolucionário"
              type="text"
              error={errors.nome}
              control={control}
              validators={register('nome', validators.nome)}
            />
            <TextAreaField
              fieldName="Descrição do projeto"
              fieldKey="descricao"
              placeholder="Ex: Esse projeto vai revolucionar o mercado com chuva de sabedoria"
              maxLength={200}
              type="text"
              error={errors.descricao}
              control={control}
              validators={register('descricao', validators.descricao)}
            />
          </form>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button
            loadingText="Loading"
            spinnerPlacement="start"
            isLoading={createProjectMutation.isLoading}
            form="createProjectForm"
            variant="primary"
            maxW="50%"
            data-testid="submit"
            type="submit"
          >
            Criar!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateProjectModal
