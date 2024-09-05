import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../interface/user.repository";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "1",
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      perfil: data.perfil,
      created_at: new Date(),
    };

    this.items.push(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) return null;

    return user;
  }

  async findByUsername(username: string) {
    const user = this.items.find((item) => item.username === username);

    if (!user) return null;

    return user;
  }
}
