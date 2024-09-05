import { UsernameAlreadyExistsError } from "./../errors/username-already-exists";
import { UserRegisterService } from "./userRegister.service";
import { expect, describe, it } from "vitest";
import { InMemoryUserRepository } from "../../repositories/in-memory/in-memory-user.repository";
import { EmailAlreadyExistsError } from "../errors/email-already-exists";

describe("User Register Service", () => {
  it("should not be able to register with same email", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new UserRegisterService(usersRepository);

    const email = "anderson@gmail.com";

    await sut.execute({
      name: "Anderson Alves",
      email,
      password: "123456",
      perfil: "A",
      username: "anderson",
    });

    await expect(() =>
      sut.execute({
        name: "Anderson Alves",
        email,
        password: "123456",
        perfil: "A",
        username: "anderson",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });

  it("should not be able to register with same username", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new UserRegisterService(usersRepository);

    const username = "anderson.alves";

    await sut.execute({
      name: "Anderson Alves",
      email: "anderson@test.com",
      password: "123456",
      perfil: "A",
      username: username,
    });

    await expect(() =>
      sut.execute({
        name: "Anderson Alves",
        email: "anderso2n@test.com",
        password: "123456",
        perfil: "A",
        username: username,
      })
    ).rejects.toBeInstanceOf(UsernameAlreadyExistsError);
  });
});
