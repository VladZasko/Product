import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from "./routers/product-router";
import {addressesRouter} from "./routers/addresses-router";
import {runDb} from "./repositories/db";


const app = express()

const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

const port = process.env.PORT || 5000

app.use('/products', productsRouter)
//app.use('/addre', addressesRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`)
    })
}

startApp()