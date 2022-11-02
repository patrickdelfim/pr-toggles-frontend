import { Box, IconButton } from '@chakra-ui/react'
import React from 'react'
import { CreateAgregado } from '@/domain/usecases/create-agregado'
import FormField from '@/presentation/components/formField/formField'
import { FiTrash2 } from 'react-icons/fi'
import { useFieldArray, useForm } from 'react-hook-form'

const AgregadoManagement: React.FC = () => {
  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<CreateAgregado.params>({
    defaultValues: {
      projeto_id: '2',
      nome: '',
      descricao: '',
      regras: [
        [
          {
            key: 'brasil',
            operator: '>',
            value: 'lula',
          },
          {
            key: 'USA',
            operator: '>',
            value: 'trump',
          },
        ],
        [
          {
            key: 'fruta',
            operator: '=',
            value: 'mamao',
          },
          {
            key: 'fruta',
            operator: '=',
            value: 'melao',
          },
        ],
      ],
    },
  })

  const { fields: andArrayFields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'regras', // unique name for your Field Array
  })

  return (
    <Box >
      <form
      id="createSegmentForFeature"
      autoComplete="off"
      onSubmit={() => console.log('create')}
    >
      {andArrayFields.map((field, index) => (
        <NestedFieldArray key={index} nestIndex={index} {...{ control, register }}/>
      ))}
    </form>

    </Box>
  )
}

type nestedFieldArray = {
  nestIndex: number
  control: any
  register: any
}
const NestedFieldArray: React.FC<nestedFieldArray> = ({ nestIndex, control, register }: nestedFieldArray) => {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `regras[${nestIndex}]`, // unique name for your Field Array
  })

  return (
      <Box>
        {fields.map((field, index) => (
        <Box key={index} display="flex" alignItems="end" py={3}>
            <Box flex="1" px={4}>
              <FormField
                fieldName="chave"
                fieldKey={field.id}
                placeholder="Ex: Chave"
                type="text"
                error={{ message: '' }}
                control={control}
                validators={register(
                  `regras.${nestIndex}.${index}.key` as const,
                  // validators.variacaoValor
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
                  `regras.${nestIndex}.${index}.operator` as const,
                  // {
                  //   ...validators.variacaoPeso,
                  //   onChange: calculateMainPercent,
                  // }
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
                  `regras.${nestIndex}.${index}.value` as const,
                  // {
                  //   ...validators.variacaoPeso,
                  //   onChange: calculateMainPercent,
                  // }
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
                  console.log('cliqued iconButton')
                  // removeVariation(index)
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>)
}

export default AgregadoManagement
