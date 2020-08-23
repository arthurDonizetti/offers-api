import { Sequelize, Model, ModelCtor } from 'sequelize'

export const SequelizeHelper = {
  client: null as Sequelize,
  uri: process.env.DATABASE_URL,
  async connect (): Promise<void> {
    this.client = new Sequelize(this.uri, {
      logging: false
    })
  },
  async testConnection (): Promise<boolean> {
    try {
      await this.client.authenticate()
      return await new Promise(resolve => resolve(true))
    } catch (error) {
      return await new Promise(resolve => resolve(false))
    }
  },
  getModel (name: string): ModelCtor<Model> {
    return this.client.models[name]
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
