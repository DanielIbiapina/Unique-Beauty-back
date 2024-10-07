import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  role: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Token de autenticação não fornecido" });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({ message: "Erro de configuração do servidor" });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "userId" in decoded &&
      "role" in decoded
    ) {
      req.user = decoded as DecodedToken;
      next();
    } else {
      res.status(401).json({ message: "Token inválido" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
}

export function adminOnly(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    res
      .status(403)
      .json({
        message:
          "Acesso negado. Apenas administradores podem acessar esta rota.",
      });
  }
}

// Estenda a interface Request do Express para incluir a propriedade user
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
