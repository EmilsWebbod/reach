export class ReachError<T = any> extends Error {
  public status: number;

  constructor(public response: Response, public body?: T) {
    super(response.statusText);
    this.status = response.status;
  }
}
