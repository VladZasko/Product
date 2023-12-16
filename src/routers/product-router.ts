import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";

export const productsRoute = Router({})




productsRoute.get('/', (req: Request, res: Response) => {

    const foundProducts = productsRepository.findProducts(req.query.title?.toString());
    res.send(foundProducts)
})
productsRoute.post('/:id', (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})
productsRoute.get('/:id', (req: Request, res: Response) => {
    let product = productsRepository.findProductByID(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRoute.put('/:id', (req: Request, res: Response) => {
    const isUpdate = productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdate) {
        const product = productsRepository.findProductByID(+req.params.id)
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
