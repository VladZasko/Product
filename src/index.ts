import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {productsRoute} from "./routers/product-router";
import {addressesRouter} from "./routers/addresses-router";


const app = express()

const port = process.env.PORT || 5000


const parserMiddleware = bodyParser({})
app.use(parserMiddleware)


app.use('/products', productsRoute)
app.use('/addre', addressesRouter)

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
})