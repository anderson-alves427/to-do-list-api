import { $Enums, Prisma, User } from "@prisma/client";

type UserCreateInputWithRole = Omit<Prisma.UserCreateInput, "role"> & {
  role: $Enums.ROLE;
};

export interface UserRepository {
  create(data: UserCreateInputWithRole): Promise<User>;

  findByEmail(email: string): Promise<User | null>;

  findByUsername(username: string): Promise<User | null>;

  findById(id: string): Promise<User | null>;
}
