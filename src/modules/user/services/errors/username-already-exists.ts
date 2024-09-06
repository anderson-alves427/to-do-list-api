export class UsernameAlreadyExistsError extends Error {
  constructor() {
    super("Usuário já cadastrado. Tente outro.");
  }
}
