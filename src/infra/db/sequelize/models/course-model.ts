import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize'

export type ModelAssociation = (campus: ModelCtor<Model<any, any>>) => void

export const CourseRepoModel = async (connection: Sequelize): Promise<ModelAssociation> => {
  interface Course extends Model {
    id: string
    campus_id: number
    name: string
    kind: string
    level: string
    shift: string
    created_at: Date
    updated_at: Date
  }

  const course = connection.define<Course>('Courses', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    campus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Campus',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kind: {
      type: DataTypes.ENUM('EaD', 'Presencial'),
      allowNull: false
    },
    level: {
      type: DataTypes.ENUM('Tecnólogo', 'Licenciatura', 'Bacharelado'),
      allowNull: false
    },
    shift: {
      type: DataTypes.ENUM('Manhã', 'Noite', 'Virtual'),
      allowNull: false
    }
  }, {
    tableName: 'courses',
    underscored: true
  })

  const associate = (campus: ModelCtor<Model<any, any>>): void => {
    // course.hasOne(offer, { onDelete: 'cascade', onUpdate: 'cascade' })
    course.belongsTo(campus, { foreignKey: 'campus_id' })
  }

  return associate
}
