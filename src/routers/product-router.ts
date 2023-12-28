import {Router, Response, Request} from "express";
import {productsService} from "../domain/product-service";
import {body, validationResult} from "express-validator";

export const productsRouter = Router({})

const titleValidation = body('title').trim().isLength({min: 3, max: 10}).withMessage('title length should ')

productsRouter.post('/', titleValidation,
    async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
        }
        const newProduct = await productsService.createProduct(req.body.title)
        res.status(201).send(newProduct)
})
productsRouter.put('/:id', titleValidation ,
    async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
        }
        const isUpdate = await productsService.updateProduct(+req.params.id, req.body.title)

        if (isUpdate) {
            const product = await productsService.findProductByID(+req.params.id)
            res.send(product)
        } else {
            res.send(404)
        }
    })
productsRouter.get('/', async (req: Request, res: Response) => {

    const foundProducts = await productsService.findProducts(req.query.title?.toString());

    res.send(foundProducts)
})

productsRouter.get('/:id', async (req: Request, res: Response) => {
    let product = await productsService.findProductByID(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.delete('/:id' , async (req: Request, res: Response) => {
    const isDeleted = await productsService.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204);
    } else {
        res.send(404)
    }
})
