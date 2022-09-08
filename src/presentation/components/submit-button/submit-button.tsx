import React from 'react'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  return (
    <button data-testid="submit" type="submit">
      {text}
    </button>
  )
}

export default SubmitButton
