export class ThereIsNoRegisteredUserError extends Error {
  constructor() {
    super("Usuário informado não está cadastrado.");
  }
}
