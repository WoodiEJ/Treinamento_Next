import { Router } from 'express'
import { authCadastro } from '../auth/authCadastro'
import { authLogin } from '../auth/authLogin'

export function authRoutes() {
    const router = Router()

    router.post('/cadastro', authCadastro)
    router.post('/login', authLogin)
    return router
}