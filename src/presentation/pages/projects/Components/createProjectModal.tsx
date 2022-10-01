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
} from '@chakra-ui/react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormField from '@/presentation/components/formField/formField'

type props = {
  isOpen: boolean
  onClose: () => void
}

const CreateProjectModal: React.FC<props> = ({ isOpen, onClose }: props) => {
  const handleCloseModal = (): void => {
    resetField('name')
    resetField('description')
    onClose()
  }

  const {
    handleSubmit,
    register,
    resetField,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CreateProject.Params>({
    defaultValues: {
      name: '',
      description: '',
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
    console.log(values)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size={'6xl'}>
      <ModalOverlay />
      <ModalContent justifyContent="center">
        <ModalHeader>Cadastrar novo projeto.</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            id="createProjectForm"
            autoComplete="off"
            onSubmit={handleSubmitForm}
          >
            <FormField
              fieldName="Nome do projeto"
              fieldKey="name"
              placeholder="Ex: backend revolucionário"
              type="text"
              error={errors.name}
              control={control}
              validators={register('name', validators.name)}
            />
            <TextAreaField
              fieldName="Descrição do projeto"
              fieldKey="description"
              placeholder="Ex: Esse projeto vai revolucionar o mercado com chuva de sabedoria"
              maxLength={200}
              type="text"
              error={errors.description}
              control={control}
              validators={register('description', validators.description)}
            />
          </form>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button
            isLoading={isSubmitting}
            form="createProjectForm"
            variant="primary"
            maxW="50%"
            data-testid="submit"
            type="submit"
          >
            Login!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateProjectModal
