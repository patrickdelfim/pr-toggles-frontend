import TextAreaField from '@/presentation/components/textAreaField/textAreaField'
import {
  Button,
  Box,
  IconButton,
  Text,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react'
import { FiTrash2 } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import FormField from '@/presentation/components/formField/formField'
import { FeatureModel } from '@/domain/models'
import useUpdateFeature from '@/presentation/hooks/useUpdateFeature'
import { UpdateFeature } from '@/domain/usecases/update-feature'
import updateFeatureValidators from '@/presentation/validators/update-feature-validators'

type props = {
  feature: FeatureModel | null
  isOpen: boolean
  onClose: () => void
  ambiente: string
}
const UpdateFeatureForm: React.FC<props> = ({ feature, isOpen, onClose, ambiente }: props) => {
  const toast = useToast()
  const [validSubmit, setValidSubmit] = useState(false)
  const onSuccess = async (): Promise<void> => {
    toast({
      title: 'Funcionalidade atualizada com sucesso!',
      status: 'success',
      isClosable: true,
    })
    reset()
    onClose()
  }

  const onError = async (error: Error): Promise<void> => {
    toast({
      id: 'updateFeatureError',
      title: error.message || 'Algo inesperado aconteceu.',
      status: 'error',
      isClosable: true,
    })
  }

  const updateFeatureMutation = useUpdateFeature(onSuccess, onError)
  const selectedStrategy = feature.estrategias.find(estrategia => estrategia.ambiente === ambiente)
  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<UpdateFeature.params>({
    defaultValues: {
      descricao: feature.descricao || '',
      estrategia: {
        valor: selectedStrategy.valor,
        variacoes: selectedStrategy.variacoes
      }
    }
  })
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'estrategia.variacoes', // unique name for your Field Array
  })

  useEffect(() => {
    if (!isOpen) {
      reset()
      return
    }
    console.log('useEffect runned')
    setValue('descricao', feature.descricao)
    setValue('estrategia.valor', selectedStrategy.valor)
    setValue('estrategia.variacoes', selectedStrategy.variacoes)
    if (selectedStrategy.variacoes.length > 0) calculateMainPercent()
  }, [isOpen])
  const removeVariation = (index: number): void => {
    remove(index)
    calculateMainPercent()
  }

  const validators = updateFeatureValidators(getValues)

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    handleSubmit(updateFeature)(event)
  }

  const updateFeature: SubmitHandler<UpdateFeature.params> = async (
    values: UpdateFeature.params
  ) => {
    if (!isDirty) {
      toast({
        title: 'Nenhum valor alterado no formulário.',
        status: 'info',
        isClosable: true,
      })
      return
    }
    // AJUSTAR PAYLOAD
    const payload = {
      ...dirtyFields?.descricao && { descricao: values.descricao },
      id: feature.id,
      ...dirtyFields?.estrategia && {
        estrategia: {
          id: selectedStrategy.id,
          ...dirtyFields?.estrategia?.valor && { valor: values.estrategia.valor },
          ...dirtyFields?.estrategia?.variacoes && {
            variacoes: values.estrategia.variacoes.map((element) => ({
              valor: element.valor,
              peso: parseFloat(element.peso),
            }))
          },
        }
      }
    }
    console.log('update feature values: ', payload)
    updateFeatureMutation.mutate(payload)
  }

  const [mainPercent, setMainPercent] = useState(100)
  const calculateMainPercent = (): void => {
    const estrategia = getValues('estrategia')
    const value =
      estrategia.variacoes.length === 0
        ? 100
        : 100 -
          estrategia.variacoes.reduce(
            (acc, current) => acc + (parseFloat(current.peso) || 0),
            0
          )
    setMainPercent(value)
    setValidSubmit(value < 0)
  }

  return (
    <Box>
      <form
        id="updateFeatureForm"
        autoComplete="off"
        onSubmit={handleSubmitForm}
      >
        <Box py={3}>
          <FormField
            fieldName={`valor${
              mainPercent >= 0 && getValues('estrategia.variacoes')?.length > 0
                ? ` - ${mainPercent}%`
                : ''
            }`}
            fieldKey="estrategia.valor"
            placeholder="Ex: true"
            type="text"
            error={errors?.estrategia?.valor}
            control={control}
            validators={register('estrategia.valor', validators.valor)}
          />
        </Box>

        {fields.length > 0
          ? (
              mainPercent >= 0
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
            )
          : (
              ''
            )}
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
                    `estrategia.variacoes.${index}.valor` as const,
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
                    `estrategia.variacoes.${index}.peso` as const,
                    {
                      ...validators.variacaoPeso,
                      onChange: calculateMainPercent,
                    }
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
              {errors?.estrategia?.variacoes?.[index]?.valor?.message ||
                errors?.estrategia?.variacoes?.[index]?.peso?.message}{' '}
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
      <Box display="flex" alignItems="end" justifyContent="end">
        <Box width="15%">
          <Button form="updateFeatureForm" type="submit" disabled={validSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default UpdateFeatureForm
