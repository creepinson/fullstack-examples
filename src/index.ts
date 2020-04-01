import express from 'express'
import { Route, ApiRoutes } from './apiRoutes'
import { createConnection } from 'typeorm'
import config from './config'
// create typeorm connection
createConnection("default").then(connection => {
  config
  const app = express()
  app.set('view engine', 'ejs')
  app.set('views', __dirname + "/../public/views")
  app.use("/assets", express.static(__dirname + "/../public/assets"))
  app.use(express.json())

  const apiRouter = express.Router();
  // Loop through all the routes
  ApiRoutes.forEach((route: Route) => {
    // Set route to controller
    apiRouter[route.method](
      route.path,
      (request, response, next: Function) => {
        route
          .action(request, response)
          .then(() => next)
          .catch(err => next(err))
      }
    )
  })
  app.use("/api", apiRouter)

  app.listen(3000, () => console.log('express app listening'))
})
