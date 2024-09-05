export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("Email já cadastrado. Tente outro.");
  }
}
