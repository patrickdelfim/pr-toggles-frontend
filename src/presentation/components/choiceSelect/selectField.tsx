import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import React from 'react'
import { Controller } from 'react-hook-form'

type props = {
  validators: object
  error: {
    message?: string
  }
  fieldName: string
  fieldKey: string
  control: any
  placeholder: string
  hideLabel?: boolean
  options: Array<{
    value: string
    text: string
  }>
}

const ChoiceSelect: React.FC<props> = ({
  validators,
  error,
  fieldName,
  fieldKey,
  control,
  hideLabel,
  placeholder,
  options
}: props) => {
  return (
    <FormControl
      data-testid={`${fieldKey}-wrap`}
      data-status={error ? 'invalid' : 'valid'}
      isInvalid={!!error?.message}
    >
      {!hideLabel && (

        <FormLabel
        data-testid={`${fieldKey}-label`}
        title={error?.message}
        htmlFor={fieldKey}
        color="primary.700"
        fontWeight="600"
        >
        {fieldName}
      </FormLabel>
      )}
      <Controller
        name={fieldKey}
        control={control}
        render={({ field }) => (
          <Select
            placeholder={placeholder}
            key={fieldKey}
            data-testid={fieldKey}
            {...field}
            {...validators}
            title={error?.message}
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.text}</option>
            ))}
          </Select>
        )}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default ChoiceSelect
