import { Router } from "express";
import { createCarro, deleteCarro, getCarro, getCarros, updateCarro } from "../controllers/carroController";

export function carroRoutes() {
    const router = Router()
    
    router.get('/', getCarros)
    router.get('/:id', getCarro)
    router.post('/', createCarro)
    router.put('/:id', updateCarro)
    router.delete('/:id', deleteCarro)
    return router
}