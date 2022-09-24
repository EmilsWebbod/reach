import { getCookieValue } from '../utils';
import { IReachOptions } from '../types';

export interface IReachApiOptions {
  csrf?: { cookie: string };
  options?: Partial<IReachOptions>;
  headers?: Headers;
  logout?: (response: Response) => void;
}

export class ReachApi {
  private _socketIds: Set<string> = new Set();
  private _onLogout: IReachApiOptions['logout'];

  constructor(readonly url: string, private opts: IReachApiOptions) {
    this._onLogout = opts.logout;
  }

  get socketIds(): string[] {
    return [...this._socketIds];
  }

  set onLogout(fn: IReachApiOptions['logout']) {
    this._onLogout = fn;
  }

  public headers(): Headers {
    return this.opts.headers || new Headers();
  }

  public options(): Partial<IReachOptions> {
    return this.opts.options || {};
  }

  public getCSRFHeaderToken(): null | [string, string] {
    if (this.opts.csrf) {
      const csrfCookie = getCookieValue(this.opts.csrf.cookie);
      if (csrfCookie) return ['X-CSRF-Token', csrfCookie];
    }
    return null;
  }

  public logout(response: Response) {
    if (this._onLogout) this._onLogout(response);
  }

  public addSocket(id: string) {
    this._socketIds.add(id);
  }

  public deleteSocket(id: string) {
    this._socketIds.delete(id);
  }
}
