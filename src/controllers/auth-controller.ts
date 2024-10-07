import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config(); // Carrega as variáveis de ambiente

const prisma = new PrismaClient();

async function authenticateUser(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  return user;
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await authenticateUser(username, password);

    if (!user) {
      res.status(401).json({ message: "Credenciais inválidas" });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ message: "Erro de configuração do servidor" });
      return;
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, {
      expiresIn: "1h",
    });

    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
