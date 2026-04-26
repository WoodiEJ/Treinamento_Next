import z from "zod";
import { Response, Request } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

export async function authCadastro(req: Request, res: Response) {
  console.log("authCadastro chamado", req.body)
  const usuarioCadastro = z.object({
    nome: z.string(),
    sobrenome: z.string(),
    nascimento: z.string(),
    email: z.string().email(),
    senha: z.string().min(8),
  });

  const result = usuarioCadastro.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ erro: result.error.message });
  }

  const { nome, sobrenome, nascimento, email, senha } = result.data;

  const usuarioExiste = await prisma.usuario.findUnique({ where: { email } });

  if (usuarioExiste) {
    return res.status(409).json({ erro: "Email já cadastrado" });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  await prisma.usuario.create({
    data: {
      nome,
      sobrenome,
      dataDeNascimento: new Date(nascimento),
      email,
      senha: senhaHash,
    },
  });

  return res.status(201).json({ mensagem: "Usuario criado" })
}
