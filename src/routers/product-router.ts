import {Router, Response, Request} from "express";
import {productsInMemoryRepository} from "../repositories/products-db-repository";
import {body, validationResult} from "express-validator";

export const productsRouter = Router({})

const titleValidation = body('title').trim().isLength({min: 3, max: 10}).withMessage('title length should ')

productsRouter.post('/', titleValidation,
    async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
        }
        const newProduct = await productsInMemoryRepository.createProduct(req.body.title)
        res.status(201).send(newProduct)
})
productsRouter.put('/:id', titleValidation ,
    async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
        }
        const isUpdate = await productsInMemoryRepository.updateProduct(+req.params.id, req.body.title)

        if (isUpdate) {
            const product = await productsInMemoryRepository.findProductByID(+req.params.id)
            res.send(product)
        } else {
            res.send(404)
        }
    })
productsRouter.get('/', async (req: Request, res: Response) => {

    const foundProducts = await productsInMemoryRepository.findProducts(req.query.title?.toString());

    res.send(foundProducts)
})

productsRouter.get('/:id', async (req: Request, res: Response) => {
    let product = await productsInMemoryRepository.findProductByID(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.delete('/:id' , async (req: Request, res: Response) => {
    const isDeleted = await productsInMemoryRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204);
    } else {
        res.send(404)
    }
})
