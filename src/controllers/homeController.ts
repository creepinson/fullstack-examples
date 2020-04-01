import { Request, Response } from 'express'
import fetch from 'node-fetch'
import { getConnection, getManager } from 'typeorm'
import { SuccessResponse, RenderResponse } from '../util/response'
import { Product } from '../entity/product'

export default async (req: Request, res: Response) => {
  const products = await getManager()
    .getRepository(Product)
    .find()
  new RenderResponse("index").send(res, { stripePublicKey: process.env.stripePublicKey, logoUrl: process.env.logoUrl, siteName: process.env.siteName, products: products  });
}
