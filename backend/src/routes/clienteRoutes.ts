import { Router } from "express";
import { createCliente, deleteCliente, getCliente, getClientes, updateCliente } from "../controllers/clienteController";

export default function clienteRoutes() {
    const router = Router()

    router.get('/', getClientes)
    router.get('/:id', getCliente)
    router.post('/', createCliente)
    router.put('/:id', updateCliente)
    router.delete('/:id', deleteCliente)
    return router
}