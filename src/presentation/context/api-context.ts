import { AccountModel } from '@/domain/models'
import { getLocalStorage, setLocalStorage } from '@/services/local-storage-service'
import { createContext } from 'react'

type Props = {
  setCurrentAccount?: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

export const setCurrentAccount = (account: AccountModel): void => {
  setLocalStorage('account', account)
}

export const getCurrentAccount = (): AccountModel => {
  return getLocalStorage('account')
}

export const ApiContext = createContext<Props>(null)
