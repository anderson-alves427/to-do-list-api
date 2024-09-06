export class ThereIsNoRegisteredTaskError extends Error {
  constructor() {
    super("Task não encontrada.");
  }
}
