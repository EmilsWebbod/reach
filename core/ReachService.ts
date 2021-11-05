import { getCookieValue } from '../utils';
import {ReachOpts} from '../types';

interface ReachServiceOptions {
  csrf?: { cookie: string; };
  options?: Partial<ReachOpts>;
  headers?: Headers;
  logout?: (response: Response) => void;
}

export class ReachService {
  public refreshingToken: boolean = false;

  constructor(private _url: string, private opts: ReachServiceOptions) {

  }

  public url() {
    return this._url;
  }

  public headers(): Headers {
    return this.opts.headers || new Headers();
  }

  public options(): Partial<ReachOpts> {
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
    if (this.opts.logout) this.opts.logout(response);
  }
}