import { GetStorage } from '../protocols/cache'
import faker from '@faker-js/faker'
export class GetStorageSpy implements GetStorage {
  key: string
  value = JSON.parse(faker.datatype.json())
  get (key: string): any {
    this.key = key
    return this.value
  }
}
