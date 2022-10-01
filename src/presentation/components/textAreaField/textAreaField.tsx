import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
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
  maxLength?: number
}

const TextAreaField: React.FC<props> = ({
  validators,
  error,
  fieldName,
  fieldKey,
  control,
  placeholder,
  type,
  mask,
  maxLength
}: props) => {
  return (
    <Box my={3}>
      <FormControl data-testid={`${fieldKey}-wrap`} data-status={error ? 'invalid' : 'valid'} isInvalid={!!error}>
        <FormLabel data-testid={`${fieldKey}-label`} title={error?.message} htmlFor={fieldKey} color="primary.700" fontWeight="600">
          {fieldName}
        </FormLabel>
        <Controller
          name={fieldKey}
          control={control}
          render={({ field }) => (
            <Textarea
              data-testid={fieldKey}
              {...field}
              {...validators}
              title={error?.message}
              type={type}
              placeholder={placeholder}
              as={!!mask && InputMask}
              mask={mask}
              maxLength={maxLength}
            />
          )}
        />
        {maxLength && (<FormHelperText>Esse campo tem um limite de {maxLength} caracteres.</FormHelperText>)}
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    </Box>
  )
}

export default TextAreaField
