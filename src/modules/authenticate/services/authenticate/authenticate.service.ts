import { UserRepository } from "@/modules/user/repositories/interface/user.repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import bcryptjs from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateServiceReuqest {
  username: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private useRepository: UserRepository) {}

  async execute({
    username,
    password,
  }: AuthenticateServiceReuqest): Promise<AuthenticateServiceResponse> {
    const user = await this.useRepository.findByUsername(username);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordsEquals = await bcryptjs.compare(password, user.password);

    if (!isPasswordsEquals) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
