import { Router } from "express";
import { createVenda, deleteVenda, getVenda, getVendas, updateVenda } from "../controllers/vendasController";

export default function vendasRoutes() {
    const router = Router()
    
    router.get('/', getVendas)
    router.get('/:id', getVenda)
    router.post('/', createVenda)
    router.put('/:id', updateVenda)
    router.delete('/:id', deleteVenda)
    return router
}