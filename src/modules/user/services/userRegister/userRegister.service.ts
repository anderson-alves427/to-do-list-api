import { hash } from "bcryptjs";
import { UserRepository } from "../../repositories/interface/user.repository";
import { UsernameAlreadyExistsError } from "../errors/username-already-exists";
import { EmailAlreadyExistsError } from "../errors/email-already-exists";

interface UserRegisterServicerRequest {
  name: string;
  email: string;
  password: string;
  username: string;
  perfil: string;
}

export class UserRegisterService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    name,
    username,
    password,
    perfil,
  }: UserRegisterServicerRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const userWithSameUsername = await this.userRepository.findByUsername(
      username
    );
    if (userWithSameUsername) {
      throw new UsernameAlreadyExistsError();
    }

    await this.userRepository.create({
      name,
      email,
      password: password_hash,
      perfil,
      username,
    });
  }
}
