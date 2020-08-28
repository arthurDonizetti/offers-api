import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize'

export type ModelAssociation = (course: ModelCtor<Model<any, any>>) => void

export const OfferRepoModel = async (connection: Sequelize): Promise<ModelAssociation> => {
  interface Offer extends Model {
    id: string
    course_id: number
    full_price: number
    price_with_discount: number
    discount_percentage: number
    start_date: string
    enrollment_semester: string
    enabled: boolean
  }

  const offer = connection.define<Offer>('Offers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Offer',
        key: 'id'
      }
    },
    full_price: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    },
    price_with_discount: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    },
    discount_percentage: {
      type: DataTypes.DECIMAL(4, 1),
      allowNull: false
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    enrollment_semester: {
      type: DataTypes.STRING,
      allowNull: false
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'offers',
    underscored: true
  })

  const associate = (course: ModelCtor<Model<any, any>>): void => {
    offer.belongsTo(course, { foreignKey: 'course_id' })
  }

  return associate
}
