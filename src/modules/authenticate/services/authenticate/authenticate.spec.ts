import bcryptjs from "bcryptjs";
import { InMemoryUserRepository } from "@/modules/user/repositories/in-memory/in-memory-user.repository";
import { describe, expect, it } from "vitest";
import { AuthenticateService } from "./authenticate.service";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { beforeEach } from "node:test";

let usersRepository: InMemoryUserRepository;
let sut: AuthenticateService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new AuthenticateService(usersRepository);
  });

  it("should be able authenticate", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new AuthenticateService(usersRepository);

    await usersRepository.create({
      name: "Anderson",
      email: "anderson@test.com",
      password: await bcryptjs.hash("teste@123", 6),
      perfil: "A",
      username: "anderson",
    });

    const { user } = await sut.execute({
      username: "anderson",
      password: "teste@123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong username", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new AuthenticateService(usersRepository);

    expect(() =>
      sut.execute({
        username: "teste",
        password: "teste@123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new AuthenticateService(usersRepository);

    await usersRepository.create({
      name: "Anderson",
      email: "anderson@test.com",
      password: await bcryptjs.hash("teste@1234", 6),
      perfil: "A",
      username: "anderson",
    });

    expect(() =>
      sut.execute({
        username: "anderson",
        password: "teste@1",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
