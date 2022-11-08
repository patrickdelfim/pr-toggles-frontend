import ChoiceSelect from '@/presentation/components/choiceSelect/selectField'
import FormField from '@/presentation/components/formField/formField'
import { Box, Button, Divider, IconButton, Text } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { useFieldArray } from 'react-hook-form'
import { FiTrash2 } from 'react-icons/fi'

type nestedSegmentRulesArray = {
  nestIndex: number
  control: any
  register: any
  removeParent: any
  validators: any
  errors: any
}
const NestedSegmentRulesArray: React.FC<nestedSegmentRulesArray> = ({
  removeParent,
  nestIndex,
  control,
  register,
  validators,
  errors,
}: nestedSegmentRulesArray) => {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `regras[${nestIndex}]`, // unique name for your Field Array
  })
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      append([
        {
          key: '',
          operation: '',
          value: '',
        },
      ])

      isInitialMount.current = false
    } else {
      if (fields.length === 0) {
        removeParent(nestIndex)
      }
    }
  }, [fields])
  return (
    <Box p={4}>
      {fields.map((field, index) => (
        <Box key={field.id}>
          <Box py={2}>
          <Box display="flex" alignItems="end" py={1}>
            <Box flex="1" px={4}>
              <FormField
                hideLabel
                fieldName="chave"
                fieldKey={field.id}
                placeholder="Chave de contexto"
                type="text"
                error={{ message: '' }}
                control={control}
                validators={register(
                  `regras.${nestIndex}.${index}.key` as const,
                  { ...validators.key }
                )}
              />
            </Box>
            <Box px={4}>
              <ChoiceSelect
                hideLabel
                fieldName="chave"
                placeholder={'operador'}
                fieldKey={field.id}
                error={{ message: '' }}
                control={control}
                validators={register(
                  `regras.${nestIndex}.${index}.operation` as const,
                  {
                    ...validators.operation,
                  }
                )}
                options={[
                  { value: '>', text: 'Maior que (>)' },
                  { value: '<', text: 'Menor que (<)' },
                  { value: '=', text: 'Igual a (=)' },
                  { value: 'contains', text: 'contains' },
                ]}
              />
            </Box>
            <Box px={4}>
              <FormField
                hideLabel
                fieldName="value"
                fieldKey={field.id}
                placeholder="valor"
                type="text"
                error={{ message: '' }}
                control={control}
                validators={register(
                  `regras.${nestIndex}.${index}.value` as const,
                  {
                    ...validators.value,
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
                disabled={nestIndex === 0 && index === 0}
                onClick={() => {
                  remove(index)
                }}
              />
            </Box>

          </Box>
          <Text px={4} fontSize="sm" color="red.500">
            {errors?.regras?.[nestIndex]?.[index]?.key?.message ||
              errors?.regras?.[nestIndex]?.[index]?.operation?.message ||
              errors?.regras?.[nestIndex]?.[index]?.value.message}
          </Text>
          </Box>
          {fields.length - 1 > index
            ? (
            <Box
              display="flex"
              flex-direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Divider
                orientation="horizontal"
                variant="dashed"
                borderColor={'gray.500'}
              />
              <Text px={2} color="gray.500">
                or
              </Text>
              <Divider
                orientation="horizontal"
                variant="dashed"
                borderColor={'gray.500'}
              />
            </Box>
              )
            : (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                py={2}
                variant="outline"
                onClick={() => {
                  append({
                    key: '',
                    operation: '',
                    value: '',
                  })
                }}
              >
                {' '}
                OR Gate
              </Button>
            </Box>
              )}
        </Box>
      ))}
    </Box>
  )
}

export default NestedSegmentRulesArray
