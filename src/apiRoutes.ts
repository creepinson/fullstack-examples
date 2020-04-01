import * as products from './controllers/productController'
import homeController from './controllers/homeController'
import { Request, Response, NextFunction } from 'express'

export abstract class Route {
  method: string
  path: string
  abstract action(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<any>
}

export const ApiRoutes: Route[] = [
  {
    method: 'get',
    path: '/products',
    action: products.list,
  },
  {
    method: 'post',
    path: '/purchase',
    action: products.purchase,
  },

  {
    method: 'post',
    path: '/product',
    action: products.create,
  },
  {
    method: 'get',
    path: '/',
    action: homeController,
  },
]
