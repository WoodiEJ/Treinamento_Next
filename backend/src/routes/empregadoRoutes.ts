import { Router } from "express";
import { createEmpregado, deleteEmpregado, getEmpregado, getEmpregados, updateEmpregado } from "../controllers/empregadoController";

export default function empregadoRoutes() {
    const router = Router()

    router.get('/', getEmpregados)
    router.get('/:id', getEmpregado)
    router.post('/', createEmpregado)
    router.put('/:id', updateEmpregado)
    router.delete('/:id', deleteEmpregado)
    return router
}