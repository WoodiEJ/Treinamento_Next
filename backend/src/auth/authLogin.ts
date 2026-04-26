import { Request, Response } from "express"
import {z} from "zod"
import {prisma} from '../../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export async function authLogin(req: Request, res: Response) {
    const usuarioSchema = z.object({
        email: z.string().email(),
        senha: z.string().min(8)
    })
    
    const result = usuarioSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({ erro: result.error.message })
    }

    const {email, senha} = result.data

    const usuario = await prisma.usuario.findUnique({
        where: {email}
    })

    if (!usuario) {
        return res.status(401).json({ erro: "Credenciais inválidas" })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
        return res.status(401).json({ erro: "Credenciais inválidas" })
    }

    const token = jwt.sign(
        {id: usuario.id },
        process.env.JWT_SECRET as string,
        {expiresIn: "7d"}
    )

    return res.status(200).json({token})
}