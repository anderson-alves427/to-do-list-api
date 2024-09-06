import { UsernameAlreadyExistsError } from "./../errors/username-already-exists";
import { UserRegisterService } from "./userRegister.service";
import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user.repository";
import { EmailAlreadyExistsError } from "../errors/email-already-exists";

let usersRepository: InMemoryUserRepository;
let sut: UserRegisterService;

describe("User Register Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new UserRegisterService(usersRepository);
  });

  it("should not be able to register with same email", async () => {
    const email = "anderson@gmail.com";

    await sut.execute({
      name: "Anderson Alves",
      email,
      password: "123456",
      role: "BASIC_MEMBER",
      username: "anderson",
    });

    await expect(() =>
      sut.execute({
        name: "Anderson Alves",
        email,
        password: "123456",
        role: "BASIC_MEMBER",
        username: "anderson",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });

  it("should not be able to register with same username", async () => {
    const username = "anderson.alves";

    await sut.execute({
      name: "Anderson Alves",
      email: "anderson@test.com",
      password: "123456",
      role: "BASIC_MEMBER",
      username: username,
    });

    await expect(() =>
      sut.execute({
        name: "Anderson Alves",
        email: "anderso2n@test.com",
        password: "123456",
        role: "BASIC_MEMBER",
        username: username,
      })
    ).rejects.toBeInstanceOf(UsernameAlreadyExistsError);
  });
});
