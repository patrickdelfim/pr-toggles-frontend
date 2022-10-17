import {
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
    <FormControl
      data-testid={`${fieldKey}-wrap`}
      data-status={error ? 'invalid' : 'valid'}
      isInvalid={!!error}
    >
      <FormLabel
        data-testid={`${fieldKey}-label`}
        title={error?.message}
        htmlFor={fieldKey}
        color="primary.700"
        fontWeight="600"
      >
        {fieldName}
      </FormLabel>
      <Controller
        name={fieldKey}
        control={control}
        render={({ field }) => (
          <Input
            key={fieldKey}
            data-testid={fieldKey}
            {...field}
            {...validators}
            title={error?.message}
            type={type}
            placeholder={placeholder}
            as={!!mask && InputMask}
            mask={mask}
          />
        )}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default FormField
