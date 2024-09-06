export class ThereIsNoRegisteredGroupError extends Error {
  constructor() {
    super("grupo informado não está cadastrado.");
  }
}
