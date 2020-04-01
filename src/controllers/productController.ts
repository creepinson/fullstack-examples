import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Product } from '../entity/product'
import { Responses, SuccessResponse } from '../util/response'
import { stripe } from '../stripe'
export const list = async (req: Request, res: Response) => {
  const products = await getManager()
    .getRepository(Product)
    .find()
    new SuccessResponse('Showing all products').send(res, { products });
}

export const purchase = async (req: Request, res: Response) => {
    const products = await getManager()
    .getRepository(Product)
    .find()
    console.log(`products ${products}`)
    let total = 0
    req.body.products.forEach((item) => {
      const itemJson = products.find((i) => {
        return i.id == item.id
      })
      total = total + item.price;
    })
    console.log(`total ${total}`)
    stripe.charges.create({
      amount: total,
      source: req.body.stripeTokenId,
      currency: 'usd'
    }).then(() => {
      console.log("charge successful")
      res.json({ message: 'successfuly purchased item'})
    }).catch(() => {
      console.log("charge failed")
      res.status(500).end()
    })
}

// TODO: add validation to req.body
export const create = async (req: Request, res: Response) => {
  if(req.body.username == process.env.adminUsername && req.body.password == process.env.adminPassword) {
    getManager()
    .getRepository(Product)
    .insert(req.body)
    .then(result =>
      res.status(201).json({ status: 'success', message:"User created", created: result.identifiers })
    )
    .catch(err => {
      // Duplicate key error
      if (err.toString().indexOf('E11000') != -1) {
        return Responses.DUPLICATE_USER.send(res)
      }
    })
  }
}