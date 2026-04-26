import { Request, Response } from "express";
import {prisma} from '@/lib/prisma'
import z from "zod";

export async function getEmpregados(req: Request, res: Response) {
    try {
        const empregados = await prisma.vendedores.findMany()
        return res.json(empregados)
    } catch (erro) {
        console.log(erro)
    }
}

export async function getEmpregado(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const empregado = await prisma.vendedores.findUnique({where: {id}})
        
        if (!empregado) {
            return res.json({mensagem: "Empregado nao existe"})
        }

        return res.json(empregado)
    } catch (erro) {
        console.log(erro)
    }
}

export async function createEmpregado(req: Request, res: Response) {
    const empregadoSchema = z.object({
        nome: z.string(),
        sobrenome: z.string(),
        cpf: z.string().min(11).max(11),
        telefone: z.string().min(10),
        email: z.string().email(),
        comissao: z.number()
    })

    try {
        const result = empregadoSchema.safeParse(req.body)

        if (!result.success) {
            return res.json({mensagem: "Preencha certo"})
        }

        const {nome, sobrenome, cpf, telefone, email, comissao} = result.data
        const empregadoExiste = await prisma.vendedores.findUnique({where: {cpf, email}})

        if (empregadoExiste) {
            return res.json({mensagem: "Empregado ja existe"})
        }

        await prisma.vendedores.create({
            data: {
                nome, 
                sobrenome,
                cpf,
                telefone,
                email,
                comissao
            }
        })

        return res.json({mensagem: "Empregado registrado"})
    } catch (erro) {
        console.log(erro)
    }
}

export async function deleteEmpregado(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const empregado = await prisma.vendedores.findUnique({where: {id}})
        
        if (!empregado) {
            return res.json({mensagem: "Empregado nao existe"})
        }

        await prisma.vendedores.delete({where: {id}})

        return res.json({mensagem: "Empregado deletado"})
    } catch (erro) {
        console.log(erro)
    }
}

export async function updateEmpregado(req: Request, res: Response) {
    const empregadoSchema = z.object({
        nome: z.string(),
        sobrenome: z.string(),
        cpf: z.string().min(11).max(11),
        telefone: z.string().min(10),
        email: z.string().email(),
        comissao: z.number()
    }).partial()
    
    try {
        const id = Number(req.params.id)
        const empregado = await prisma.vendedores.findUnique({where: {id}})

        if (!empregado) {
            return res.json({mensagem: "Empregado nao existe"})
        }

        const result = empregadoSchema.safeParse(req.body)

        if (!result.success) {
            return res.json({mensagem: "Valide os dados"})
        }

        await prisma.vendedores.update({
            where: {id},
            data: result.data
        })

        return res.json({mensagem: "Empregado atualizado"})
    } catch (erro) {
        console.log(erro)
    }
}