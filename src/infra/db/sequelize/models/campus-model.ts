import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize'

export type ModelAssociation = (course: ModelCtor<Model<any, any>>, university: ModelCtor<Model<any, any>>) => void

export const CampusRepoModel = async (connection: Sequelize): Promise<ModelAssociation> => {
  interface Campus extends Model {
    id: string
    university_id: number
    name: string
    city: string
    created_at: Date
    updated_at: Date
  }

  const campus = connection.define<Campus>('Campus', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    university_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'University',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'campus',
    underscored: true
  })

  const associate = (course: ModelCtor<Model<any, any>>, university: ModelCtor<Model<any, any>>): void => {
    campus.hasMany(course, { onDelete: 'cascade', onUpdate: 'cascade' })
    campus.belongsTo(university, { foreignKey: 'university_id' })
  }

  return associate
}
