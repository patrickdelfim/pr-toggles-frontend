import { Box, Button, Divider, DrawerFooter, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { CreateAgregado } from '@/domain/usecases/create-agregado'
import FormField from '@/presentation/components/formField/formField'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import NestedSegmentRulesArray from './nestedSegmentRuleArray'
import createSegmentRulesValidation from '@/presentation/validators/create-segment-rules-validators'
import { useParams } from 'react-router-dom'
import useCreateAgregado from '@/presentation/hooks/useCreateAgregado'

type props = {
  cancelAddAgregadoAction: () => void
}
const AgregadoManagement: React.FC<props> = ({ cancelAddAgregadoAction }: props) => {
  const params = useParams()
  const projectId = parseInt(params.id)
  const toast = useToast()
  const onSuccess = async (): Promise<void> => {
    toast({
      title: 'Agregado criado com sucesso!',
      status: 'success',
      isClosable: true,
    })
    cancelAddAgregadoAction()
  }

  const onError = async (error: Error): Promise<void> => {
    toast({
      title: error.message || 'Algo inesperado aconteceu.',
      status: 'error',
      isClosable: true,
    })
  }

  const agregadoMutation = useCreateAgregado(projectId, onSuccess, onError)
  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CreateAgregado.Params>({
    defaultValues: {
      projeto_id: projectId,
      nome: '',
      descricao: '',
      regras: [[]],
    },
  })

  const validators = createSegmentRulesValidation(getValues)

  const { fields: andArrayFields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'regras', // unique name for your Field Array
  })

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    console.log(event)
    handleSubmit(createNewFeature)(event)
  }

  const createNewFeature: SubmitHandler<any> = async (
    values: any
  ) => {
    console.log('SubmitedSegmentValues: ', values)
    agregadoMutation.mutate(values)
  }

  return (
    <Box >
      <form
      id="createSegmentForFeature"
      autoComplete="off"
      onSubmit={handleSubmitForm}
    >
      <Box width="30%" px={4}>

      <FormField
                fieldName="nome do segmento"
                fieldKey={'nome'}
                placeholder="clientes_tipo_A"
                type="text"
                error={errors.nome}
                control={control}
                validators={register(
                  'nome',
                  {
                    ...validators.nome,
                    onChange: () => setValue('nome', getValues('nome').replace(' ', '_'))
                  }
                )}
                  />
                  </Box>
          <Text pt={4} fontWeight="bold">Condições de segmentação:</Text>
      {andArrayFields.map((field, index) => (
        <Box key={field.id}>
        <Box boxShadow='xl' bgColor="#F5F5F5" my={2}>
          <NestedSegmentRulesArray removeParent={remove} validators={validators} errors={errors} nestIndex={index} {...{ control, register }}/>
        </Box>
          {index < andArrayFields.length - 1 && (<Box display='flex' flex-direction='row' alignItems='center' justifyContent='center' >
            <Divider orientation='horizontal' variant="dashed" borderColor={'gray.500'}/>
            <Text px={2} color="gray.500">Or</Text>
            <Divider orientation='horizontal' variant="dashed" borderColor={'gray.500'}/>
          </Box>)}
        </Box>
      ))}
      <Box py={2} display="flex" alignItems="center" justifyContent="center">

      <Button variant="outline" onClick={() => append([{
        key: '',
        operation: '',
        value: '',
      }])}>Or Gate</Button>
      </Box>
      <Box width="70%" px={4}>

            <FormField
                fieldName="Descricao do segmento (opcional)"
                fieldKey={'descricao'}
                placeholder="Ex: pessoas do estado Rio de janeiro"
                type="text"
                error={errors.descricao}
                control={control}
                validators={register(
                  'descricao',
                  {
                    ...validators.descricao,
                  }
                )}
                    />
                    </Box>
    </form>
    <DrawerFooter>
                <Box display='flex' flex-direction='row' alignItems="end" justifyContent="end">
                <Button
                    variant="ghost"
                    onClick={cancelAddAgregadoAction}
                    disabled={agregadoMutation.isLoading}
                  >
                    Cancel
                  </Button>
                  <Button mx={4}
                    form="createSegmentForFeature"
                    type="submit"
                    isLoading={agregadoMutation.isLoading}
                  >
                    Save
                  </Button>
                </Box>
              </DrawerFooter>
    </Box>
  )
}
export default AgregadoManagement
