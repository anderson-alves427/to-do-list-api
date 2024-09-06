import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { name: string; role: "ADMIN" | "BASIC_MEMBER" };
    user: {
      sub: string;
      role: "ADMIN" | "BASIC_MEMBER";
    };
  }
}
