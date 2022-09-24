export class ReachError extends Error {
  constructor(
    readonly response: Response,
    readonly status: number,
    message: string
  ) {
    super(message);
  }
}
