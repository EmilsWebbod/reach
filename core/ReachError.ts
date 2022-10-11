export class ReachError extends Error {
  public status: number;

  constructor(public response: Response) {
    super(response.statusText);
    this.status = response.status;
  }
}
