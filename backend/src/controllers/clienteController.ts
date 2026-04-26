import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";
import z from "zod";

export async function getClientes(req: Request, res: Response) {
  try {
    const clientes = await prisma.clientes.findMany();
    return res.json(clientes);
  } catch {
    return res.json({ erro: "Erro interno" });
  }
}

export async function getCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const cliente = await prisma.clientes.findUnique({ where: { id } });

    if (!cliente) {
      return res.json({ mensagem: "Cliente nao existe" });
    }

    return res.json(cliente);
  } catch {
    return res.json({ erro: "Erro interno" });
  }
}

export async function createCliente(req: Request, res: Response) {
  const clienteSchema = z.object({
    nome: z.string(),
    sobrenome: z.string(),
    dataDeNascimento: z.string(),
    telefone: z.string().min(10).max(11),
    email: z.string().email(),
    cpf: z.string().min(11).max(11),
  });

  try {
    const result = clienteSchema.safeParse(req.body);

    if (!result.success) {
      return res.json({ mensagem: "Preencha todos os campos" });
    }

    const { nome, sobrenome, dataDeNascimento, telefone, email, cpf } =
      result.data;
    const clienteExiste = await prisma.clientes.findUnique({ where: { cpf } });

    if (clienteExiste) {
      return res.json({ mensagem: "Cliente já existe" });
    }

    await prisma.clientes.create({
      data: {
        nome,
        sobrenome,
        dataDeNascimento: new Date(dataDeNascimento),
        telefone,
        email,
        cpf,
      },
    });

    return res.json({ mensagem: "Cliente registrado" });
  } catch (error) {
    console.log(error);
    return res.json({ erro: "Erro interno" });
  }
}

export async function deleteCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const cliente = await prisma.clientes.findUnique({ where: { id } });

    if (!cliente) {
      return res.json({ mensagem: "Cliente nao existe" });
    }

    await prisma.clientes.delete({ where: { id } });
    return res.json({ mensagem: "Cliente deletado" });
  } catch {
    return res.json({ erro: "Erro interno" });
  }
}

export async function updateCliente(req: Request, res: Response) {
  const clienteSchema = z
    .object({
      nome: z.string(),
      sobrenome: z.string(),
      dataDeNascimento: z.string(),
      telefone: z.string().min(10).max(11),
      email: z.string().email(),
      cpf: z.string().min(11).max(11),
    })
    .partial();

  try {
    const id = Number(req.params.id);
    const cliente = await prisma.clientes.findUnique({ where: { id } });

    if (!cliente) {
      return res.json({ mensagem: "Cliente nao existe" });
    }

    const result = clienteSchema.safeParse(req.body);

    if (!result.success) {
      return res.json({ mensagem: "Valide os dados" });
    }

    await prisma.clientes.update({
      where: { id },
      data: result.data,
    });

    return res.json({ mensagem: "Cliente atualizado" });
  } catch {
    return res.json({ erro: "Erro interno" });
  }
}
