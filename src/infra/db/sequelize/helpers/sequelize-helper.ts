import { Sequelize } from 'sequelize'

export const SequelizeHelper = {
  client: null as Sequelize,
  uri: null as string,
  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = new Sequelize(this.uri, {
      logging: false
    })
  },
  async testConnection (): Promise<boolean> {
    try {
      await this.client.authenticate()
      return true
    } catch (error) {
      return false
    }
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
