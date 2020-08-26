import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize'

export type ModelAssociation = (campus: ModelCtor<Model<any, any>>) => void

export const UniversityRepoModel = async (connection: Sequelize): Promise<ModelAssociation> => {
  interface University extends Model {
    id: string
    name: string
    score: number
    logo_url: string
    created_at: Date
    updated_at: Date
  }

  const university = connection.define<University>('Universities', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false
    },
    logo_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'universities',
    underscored: true
  })

  const associate = (campus: ModelCtor<Model<any, any>>): void => {
    university.hasMany(campus, { onDelete: 'cascade', onUpdate: 'cascade' })
  }

  return associate
}
