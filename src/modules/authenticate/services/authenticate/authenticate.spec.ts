import bcryptjs from "bcryptjs";
import { InMemoryUserRepository } from "@/modules/user/repositories/in-memory/in-memory-user.repository";
import { describe, expect, it } from "vitest";
import { AuthenticateService } from "./authenticate.service";

describe("Authenticate Service", () => {
  it("should not be able to register with same email", async () => {
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
});
