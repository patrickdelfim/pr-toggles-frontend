import { AddAccount } from '@/domain/usecases'
import faker from '@faker-js/faker'
import { mockAccountModel } from '@/domain/test'

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()
  return {
    nomeEmpresa: faker.company.companyName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
    phone: faker.phone.phoneNumber('(##) #####-####')
  }
}

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()

export class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel()
  params: AddAccount.Params
  callsCount = 0
  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params
    this.callsCount++
    return await Promise.resolve(this.account)
  }
}
