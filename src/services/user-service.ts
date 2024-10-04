import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user-repository";

interface CreateUserData {
  username: string;
  password: string;
  role: string;
}

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData: CreateUserData) {
    const { username, password, role } = userData;

    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error("Usuário ou e-mail já existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.create({
      username,
      password: hashedPassword,
      role,
    });
  }
}
