import { UserRepository } from "../../repositories/interface/user.repository";
import { UsernameAlreadyExistsError } from "../errors/username-already-exists";
import { EmailAlreadyExistsError } from "../errors/email-already-exists";
import bcryptjs from "bcryptjs";

interface UserRegisterServicerRequest {
  name: string;
  email: string;
  password: string;
  username: string;
  role: "BASIC_MEMBER" | "ADMIN";
}

interface UserRegisterServicerResponse {
  name: string;
  email: string;
  role: string;
  username: string;
}

export class UserRegisterService {
  constructor(private userRepository: UserRepository) {}

  async execute(
    data: UserRegisterServicerRequest
  ): Promise<UserRegisterServicerResponse> {
    const password_hash = await bcryptjs.hash(data.password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(data.email);

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const userWithSameUsername = await this.userRepository.findByUsername(
      data.username
    );
    if (userWithSameUsername) {
      throw new UsernameAlreadyExistsError();
    }

    const { name, email, username, role } = await this.userRepository.create({
      ...data,
      password: password_hash,
    });

    return {
      email,
      name,
      username,
      role,
    };
  }
}
