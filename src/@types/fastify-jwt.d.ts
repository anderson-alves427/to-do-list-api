import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { name: string; perfil: string };
    user: {
      sub: number;
    };
  }
}
