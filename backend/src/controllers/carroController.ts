import {prisma} from '../../lib/prisma'
import { Request, Response } from 'express'
import z from 'zod'

export async function getCarros(req: Request, res: Response) {
    try {
        const carros = await prisma.carros.findMany()
        return res.json(carros)
    } catch(erro) {
        console.log(erro)
    }
}

export async function getCarro(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const carro = await prisma.carros.findUnique({where: {id}})

        if (!carro) {
            return res.json({erro: "Carro nao encontrado"})
        }

        return res.json(carro)
    } catch(erro) {
        console.log(erro)
    }
}

export async function createCarro(req: Request, res: Response) {
    const carroCadastro = z.object({
        nome: z.string(),
        modelo: z.string(),
        ano: z.number().positive().min(1885),
        cor: z.string(),
        preco: z.number().positive()
    })
    
    try {
        const result = carroCadastro.safeParse(req.body)

        if (!result.success) {
            return res.json({erro: "Preencha todos os campos"})
        }

        const {nome, modelo, ano, cor, preco } = result.data
        const carroExiste = await prisma.carros.findFirst({
            where: {nome, modelo}
        })

        if (carroExiste) {
            return res.json({erro: "Carro ja esta cadastrado"})
        }

        await prisma.carros.create({
            data: {
                nome,
                modelo, 
                ano,
                cor, 
                preco
            }
        })

        return res.json({mensagem: "Carro cadastrado"})
    } catch(erro) {
        console.log(erro)
    }
}

export async function deleteCarro(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const carro = await prisma.carros.findUnique({where: {id}})

        if (!carro) {
            return res.json({mensagem: "Carro nao encontrado"})
        }

        await prisma.carros.delete({where: {id}})
        return res.json({mensagem: "Carro deletado com sucesso"})
    } catch(erro) {
        console.log(erro)
    }
}

export async function updateCarro(req: Request, res: Response) {
    const carroCadastro = z.object({
        nome: z.string(),
        modelo: z.string(),
        ano: z.number().positive().min(1885),
        cor: z.string(),
        preco: z.number().positive()
    }).partial()

    try {
        const id = Number(req.params.id)
        const carro = await prisma.carros.findUnique({where: {id}})

        if (!carro) {
            return res.json({mensagem: "Carro nao encontrado"})
        }

        const result = carroCadastro.safeParse(req.body)

        if (!result.success) {
            return res.json({ erro: "" })
        }

        await prisma.carros.update({
            where: {id},
            data: result.data
        })

        return res.json({ mensagem: "Carro atualizado com sucesso" })
    } catch(erro) {
        console.log(erro)
    }
}