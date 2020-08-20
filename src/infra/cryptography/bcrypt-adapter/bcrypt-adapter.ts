import bcrypt from 'bcrypt'
import { Hasher } from '../../../data/protocols/hasher'

export class BcryptAdapter implements Hasher {
  constructor (
    private readonly salt: number
  ) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return await new Promise(resolve => resolve(hash))
  }
}