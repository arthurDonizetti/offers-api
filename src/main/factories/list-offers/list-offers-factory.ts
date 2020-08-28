import { ListOffersController } from '../../../presentation/controllers/list-offers/list-offers-controller'
import { SequelizeHelper as connection } from '../../../infra/db/sequelize/helpers/sequelize-helper'
import { makeListOffersValidation } from './list-offers-validation'
import { DbListOffers } from '../../../data/usecases/list-offers/db-list-offers'
import { OfferPostgreRepository } from '../../../infra/db/sequelize/offer-repository/offer-repository'

export const makeListOffersController = async (): Promise<ListOffersController> => {
  await connection.connect()
  const listOfferRepository = new OfferPostgreRepository(connection)
  const listOffers = new DbListOffers(listOfferRepository)
  return new ListOffersController(listOffers, makeListOffersValidation())
}
