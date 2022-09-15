export class EmailInUseError extends Error {
  constructor () {
    super('Esse e-mail já esta em uso')
    this.name = 'EmailInUseError'
  }
}
