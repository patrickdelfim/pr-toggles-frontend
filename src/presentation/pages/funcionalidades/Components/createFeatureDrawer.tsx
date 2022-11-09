import TextAreaField from '@/presentation/components/textAreaField/textAreaField'
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Box,
  IconButton,
  Text,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react'
import { FiTrash2 } from 'react-icons/fi'
import React, { useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import FormField from '@/presentation/components/formField/formField'
import { CreateFeature } from '@/domain/usecases/create-feature'
import createFeatureValidators from '@/presentation/validators/create-feature-validators'
import useCreateFeature from '@/presentation/hooks/useCreateFeature'
import { useParams } from 'react-router-dom'

type props = {
  isOpen: boolean
  onClose: () => void
}

const CreateFeatureDrawer: React.FC<props> = ({ isOpen, onClose }: props) => {
  const toast = useToast()
  const params = useParams()
  const projectId = parseInt(params.id, 10)
  const handleCloseModal = (): void => {
    reset()
    onClose()
  }

  const onSuccess = async (): Promise<void> => {
    toast({
      id: 'saveProjectSuccess',
      title: 'Funcionalidade criada com sucesso!',
      status: 'success',
      isClosable: true,
    })
    reset()
    onClose()
  }

  const onError = async (error: Error): Promise<void> => {
    toast({
      id: 'saveFeatureError',
      title: error.message || 'Algo inesperado aconteceu.',
      status: 'error',
      isClosable: true,
    })
  }

  const createFeatureMutation = useCreateFeature(projectId, onSuccess, onError)

  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateFeature.Params>({
    defaultValues: {
      nome: '',
      descricao: '',
      valor: '',
      variacoes: [],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'variacoes', // unique name for your Field Array
  })
  const removeVariation = (index: number): void => {
    remove(index)
    calculateMainPercent()
  }

  const validators = createFeatureValidators(getValues)

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    console.log(event)
    handleSubmit(createNewFeature)(event)
  }

  const createNewFeature: SubmitHandler<CreateFeature.Params> = async (
    values: CreateFeature.Params
  ) => {
    const payload = {
      projeto_id: projectId,
      ...values,
      variacoes: values.variacoes.map(element => ({ valor: element.valor, peso: parseFloat(element.peso) }))
    }
    createFeatureMutation.mutate(payload)
  }

  const [mainPercent, setMainPercent] = useState(100)
  const calculateMainPercent = (): void => {
    const variacoesArray = getValues('variacoes')
    const value = variacoesArray.length === 0 ? 100 : 100 - variacoesArray.reduce((acc, current) => acc + (parseFloat(current.peso) || 0), 0)
    setMainPercent(value)
  }
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={handleCloseModal} size={'xl'}>
      <DrawerOverlay />
      <DrawerContent>
        <Box borderBottomWidth="1px">
          <DrawerHeader>Criar uma nova feature</DrawerHeader>
        </Box>
        <DrawerCloseButton />
        <DrawerBody display="flex" justifyContent="center">
          <Box width="100%">
            <form
              id="createFeatureForm"
              autoComplete="off"
              onSubmit={handleSubmitForm}
            >
              <Box py={3}>

              <FormField
                fieldName="Nome da feature"
                fieldKey="nome"
                placeholder="Ex: Chatbot"
                type="text"
                error={errors.nome}
                control={control}
                validators={register('nome', { ...validators.nome, onChange: () => setValue('nome', getValues('nome').replace(' ', '_')) })}
                />
                </Box>
              <Box py={3}>

              <FormField
                fieldName={`valor${mainPercent >= 0 && getValues('variacoes').length > 0 ? ` - ${mainPercent}%` : ''}`}
                fieldKey="valor"
                placeholder="Ex: true"
                type="text"
                error={errors.valor}
                control={control}
                validators={register('valor', validators.valor)}
                />
                </Box>

              {fields.length > 0
                ? mainPercent >= 0
                  ? (
                <Alert status="info" py={3}>
                  <AlertIcon />
                  Variações são configuradas com base em porcentagem.
                </Alert>
                    )
                  : (
                <Alert status="error" py={3}>
                  <AlertIcon />
                  As porcentagens calculadas ultrapassam 100%.
                </Alert>
                    )
                : ''
            }
              {fields.map((field, index) => (
                <Box key={field.id}>
                  <Box display="flex" alignItems="end" py={3}>
                    <Box flex="1" px={4}>
                      <FormField
                        fieldName="variação"
                        fieldKey={field.id}
                        placeholder="Ex: valor variacao"
                        type="text"
                        error={{ message: '' }}
                        control={control}
                        validators={register(
                          `variacoes.${index}.valor` as const,
                          validators.variacaoValor
                        )}
                      />
                    </Box>
                    <Box px={4}>
                      <FormField
                        fieldName="peso"
                        fieldKey={field.id}
                        placeholder="Ex: valor peso"
                        type="number"
                        error={{ message: '' }}
                        control={control}
                        validators={register(
                          `variacoes.${index}.peso` as const,
                          { ...validators.variacaoPeso, onChange: calculateMainPercent }
                        )}
                      />
                    </Box>
                    <Box alignSelf="end">
                      <IconButton
                        color="red"
                        width="30px"
                        size="lg"
                        variant="ghost"
                        aria-label="delete variant"
                        icon={<FiTrash2 size="22px" />}
                        onClick={() => {
                          removeVariation(index)
                        }}
                      />
                    </Box>
                  </Box>
                  <Text px={4} fontSize="sm" color="red.500">
                    {errors?.variacoes?.[index]?.valor?.message ||
                      errors?.variacoes?.[index]?.peso?.message}{' '}
                  </Text>
                </Box>
              ))}
              <Box display="flex" alignItems="center" justifyContent="center" py={3}>
                <Button
                  variant="outline"
                  color="primary.500"
                  onClick={() => {
                    console.log(errors)
                    append({ valor: '', peso: '0' })
                  }}
                >
                  add variação
                </Button>
              </Box>
              <TextAreaField
                fieldName="Descrição da feature"
                fieldKey="descricao"
                placeholder="Ex: Feature para adicionar liberação gradual do nosso mais novo chatbot empresarial"
                maxLength={200}
                type="text"
                error={errors.descricao}
                control={control}
                validators={register('descricao', validators.descricao)}
              />
            </form>
          </Box>
        </DrawerBody>

        <DrawerFooter>
          <Box >
            <Button form="createFeatureForm" isLoading={createFeatureMutation.isLoading} type="submit" disabled={!(mainPercent >= 0)}>
              Save
            </Button>
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CreateFeatureDrawer
