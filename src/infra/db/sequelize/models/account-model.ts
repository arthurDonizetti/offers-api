import { Model, DataTypes } from 'sequelize'
import { SequelizeHelper } from '../helpers/sequelize-helper'

const connection = SequelizeHelper.client

class Account extends Model {
  public id!: string
  public name!: string
  public email!: string
  public password!: string
  public readonly created_at!: Date
  public readonly updated_at!: Date
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'accounts',
    sequelize: connection,
    underscored: true
  }
)

export default Account
