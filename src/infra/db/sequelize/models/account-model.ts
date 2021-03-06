import { Model, DataTypes, Sequelize } from 'sequelize'

export const AccountRepoModel = async (connection: Sequelize): Promise<void> => {
  interface Account extends Model {
    id: string
    name: string
    email: string
    password: string
    access_token: string
    created_at: Date
    updated_at: Date
  }

  connection.define<Account>('Accounts', {
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
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'accounts',
    underscored: true
  })
}
