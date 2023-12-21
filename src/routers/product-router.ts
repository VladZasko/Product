import {Router, Response, Request} from "express";
import {productsRepository, ProductType} from "../repositories/products-repository";
import {body, validationResult} from "express-validator";

export const productsRoute = Router({})

const titleValidation = body('title').trim().isLength({min: 3, max: 10}).withMessage('title length should ')

productsRoute.post('/', titleValidation, (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
        }
        const newProduct = productsRepository.createProduct(req.body.title)
        res.status(201).send(newProduct)
    })
productsRoute.put('/:id', titleValidation , (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       res.status(400).json({errors: errors.array()})
    }
    const isUpdate = productsRepository.updateProduct(+req.params.id, req.body.title)


    if (isUpdate) {
        const product = productsRepository.findProductByID(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRoute.get('/', async (req: Request, res: Response) => {

    const foundProductsPromise: Promise<ProductType[]> = productsRepository.findProducts(req.query.title?.toString());

    const foundProducts = await foundProductsPromise

    res.send(foundProducts)
})

productsRoute.get('/:id', (req: Request, res: Response) => {
    let product = productsRepository.findProductByID(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRoute.delete('/:id' , (req: Request, res: Response) => {
    const isDeleted = productsRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204);
    } else {
        res.send(404)
    }
})
