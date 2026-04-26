import { Request, Response } from "express";
import {prisma} from '@/lib/prisma'
import z from "zod";

export async function getVendas(req: Request, res: Response) {
    try {
        const vendas = await prisma.vendas.findMany()
        return res.json(vendas)
    } catch (erro) {
        console.log(erro)
    }
}

export async function getVenda(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const venda = await prisma.vendas.findUnique({where: {id}})

        if (!venda) {
            return res.json({mensagem: "Venda nao existe"})
        }
         
        return res.json(venda)
    } catch (erro) {
        console.log(erro)
    }
}

export async function createVenda(req: Request, res: Response) {
    const vendaSchema = z.object({
        carroId: z.number(),
        vendedorId: z.number(),
        clienteId: z.number(),
        valorTotal: z.number().positive()
    })

    try {
        const result = vendaSchema.safeParse(req.body)

        if (!result.success) {
            return res.json({mensagem: "Preenche os dados corretamente"})
        }

        const {carroId, vendedorId, clienteId, valorTotal} = result.data

        const carroExiste = await prisma.carros.findUnique({where: {id: carroId}})
        const vendedorExiste = await prisma.vendedores.findUnique({where: {id: vendedorId}})
        const clienteExiste = await prisma.clientes.findUnique({where: {id: clienteId}})

        if(!carroExiste || !vendedorExiste || !clienteExiste) {
            return res.json({mensagem: "Um dos dados nao existe"})
        } 

        await prisma.vendas.create({
            data: {
                carroId, 
                vendedorId,
                clienteId,
                valorTotal
            }
        })

        return res.json({mensagem: "Venda registrada"})
    } catch (erro) {
        console.log(erro)
    }
}

export async function deleteVenda(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const venda = await prisma.vendas.findUnique({where: {id}})

        if (!venda) {
            return res.json({mensagem: "Venda nao existe"})
        }

        await prisma.vendas.delete({where: {id}})
        return res.json({mensagem: "Venda deletado"})
    } catch (erro) {
        console.log(erro)
    }
}

export async function updateVenda(req: Request, res: Response) {
    const vendaSchema = z.object({
        carroId: z.number(),
        vendedorId: z.number(),
        clienteId: z.number(),
        valorTotal: z.number().positive()
    }).partial()
    
    try {
        const id = Number(req.params.id)
        const venda = await prisma.vendas.findUnique({where: {id}})

        if (!venda) {
            return res.json({mensagem: "Venda nao existe"})
        }

        const result = vendaSchema.safeParse(req.body)
        
        if (!result.success) {
            return res.json({mensagem: "Preenche os dados corretamente"})
        }

        await prisma.vendas.update({
            where: {id},
            data: result.data
        })

        return res.json({mensagem: "Venda editado"})
    } catch (erro) {
        console.log(erro)
    }
}