import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../interface/user.repository";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role!,
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

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) return null;

    return user;
  }
}
