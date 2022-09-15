import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import React from 'react'
import { Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'

type props = {
  validators: object
  error: {
    message?: string
  }
  fieldName: string
  fieldKey: string
  control: any
  placeholder: string
  type: string
  mask?: string
}

const FormField: React.FC<props> = ({
  validators,
  error,
  fieldName,
  fieldKey,
  control,
  placeholder,
  type,
  mask,
}: props) => {
  return (
    <Box my={3}>
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={fieldKey} color="primary.700" fontWeight="600">
          {fieldName}
        </FormLabel>
        <Controller
          name={fieldKey}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              {...validators}
              type={type}
              placeholder={placeholder}
              as={!!mask && InputMask}
              mask={mask}
            />
          )}
        />
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    </Box>
  )
}

export default FormField
