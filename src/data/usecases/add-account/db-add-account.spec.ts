import { DbAddAccount } from './db-add-account'
import { Hasher } from '../../../data/protocols/hasher'

describe('DbAddAccount Usecase', () => {
  test('Should call hasher with correct password', async () => {
    class HasherStub implements Hasher {
      async hash (value: string): Promise<string> {
        return await new Promise(resolve => resolve('hashed_password'))
      }
    }
    const hasherStub = new HasherStub()
    const sut = new DbAddAccount(hasherStub)
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(hashSpy).toHaveBeenCalledWith(accountData.password)
  })
})
