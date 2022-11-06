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
import React, { useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import FormField from '@/presentation/components/formField/formField'
import { CreateOrUpdateEstrategiaHasAgregado } from '@/domain/usecases/create-estrategiaHasAgregado'
import updateStrategyHasAgregadoValidators from '@/presentation/validators/update-strategyHasAgregado-validators'
import useCreateOrUpdateStrategyHasAgregado from '@/presentation/hooks/useCreateOrUpdateStrategyHasAgregado'

type props = {
  agregado: string
  estrategiaId: string
  onClose: () => void
}
const UpdateSegmentForm: React.FC<props> = ({
  agregado,
  estrategiaId,
  onClose,
}: props) => {
  const toast = useToast()
  const onSuccess = async (): Promise<void> => {
    toast({
      title: 'Regras para o segmento atualizado com sucesso!',
      status: 'success',
      isClosable: true,
    })
    reset()
    onClose()
  }
  console.log('agregadoId: ', agregado)
  const [validSubmit, setValidSubmit] = useState(false)

  const onError = async (error: Error): Promise<void> => {
    toast({
      id: 'updateFeatureError',
      title: error.message || 'Algo inesperado aconteceu.',
      status: 'error',
      isClosable: true,
    })
  }

  const createOrUpdateStrategyHasAgregadoMutation = useCreateOrUpdateStrategyHasAgregado(onSuccess, onError)
  const [agregadoId, agregadoName] = agregado.split(',')
  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<CreateOrUpdateEstrategiaHasAgregado.Params>({
    defaultValues: {
      estrategia_id: estrategiaId,
      agregado_id: '',
      ativado: false,
      valor: '',
      variacoes: [],
    },
  })
  setValue('agregado_id', agregadoId)
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'variacoes', // unique name for your Field Array
  })

  const removeVariation = (index: number): void => {
    remove(index)
    calculateMainPercent()
  }

  const validators = updateStrategyHasAgregadoValidators(getValues)

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    handleSubmit(updateEstrategiaHasAgregado)(event)
  }

  const updateEstrategiaHasAgregado: SubmitHandler<CreateOrUpdateEstrategiaHasAgregado.Params> = async (
    values: CreateOrUpdateEstrategiaHasAgregado.Params
  ) => {
    if (!isDirty) {
      toast({
        title: 'Nenhum valor alterado no formulário.',
        status: 'info',
        isClosable: true,
      })
      return
    }
    console.log('update feature values: ', values)
    createOrUpdateStrategyHasAgregadoMutation.mutate(values)
  }

  const [mainPercent, setMainPercent] = useState(100)
  const calculateMainPercent = (): void => {
    const variacoes = getValues('variacoes')
    const value =
      variacoes.length === 0
        ? 100
        : 100 -
          variacoes.reduce(
            (acc, current) => acc + (parseFloat(current.peso) || 0),
            0
          )
    setMainPercent(value)
    setValidSubmit(value < 0)
  }

  return (
    <Box>
      <Text>{agregadoName}</Text>
      <form
        id="updateStrategyHasAgregadoForm"
        autoComplete="off"
        onSubmit={handleSubmitForm}
      >
        <Box py={3}>
          <FormField
            fieldName={`valor (opcional)${
              mainPercent >= 0 && getValues('variacoes')?.length > 0
                ? ` - ${mainPercent}%`
                : ''
            }`}
            fieldKey="valor"
            placeholder="Ex: true"
            type="text"
            error={errors?.valor}
            control={control}
            validators={register('valor', validators.valor)}
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
      </form>
      <Box display="flex" alignItems="end" justifyContent="end">
        <Box width="15%">
          <Button form="updateStrategyHasAgregadoForm" type="submit" disabled={validSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default UpdateSegmentForm
