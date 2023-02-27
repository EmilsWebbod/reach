import { ReachBody } from './ReachBody';
import { ReachError } from './ReachError.js';
import { ReachService } from './ReachService';
import { IReachOptions, IReachOptionsLogoutOptions } from '../types';

export class Reach {
  private busy = false;

  constructor(private reachService: ReachService) {}

  async api<T = object>(path: string, optsOverride?: IReachOptions): Promise<T> {
    try {
      this.busy = true;
      const opts: IReachOptions = {
        method: 'GET',
        ...this.reachService.options(),
        ...(optsOverride || {}),
      };

      const url = this.url(path, opts);
      const headers = this.headers(opts);
      const body = ReachBody.get(opts);

      const response = await fetch(url, {
        method: opts.method,
        headers,
        body,
        mode: opts.mode,
        credentials: opts.credentials,
      });

      let data: T | null = null;

      if (response.status === 204) {
        return data as any;
      }

      if (response.status < 300) {
        data = opts.noJson ? response : await response.json();
      } else if (response.status >= 400) {
        await this.error(response, opts.logoutOptions);
      }

      if (!data) {
        await this.error(response);
      }

      return data as T;
    } catch (e) {
      throw e;
    } finally {
      this.busy = false;
    }
  }

  private url(path: string, opts: IReachOptions) {
    let url = opts.usePathAsUrl ? path : this.reachService.url;
    if (!opts.usePathAsUrl) {
      url += path ? `/${path}` : '';
    }
    let params = '';

    if (opts.query) {
      params = `?${new URLSearchParams(opts.query).toString()}`;
    }

    return `${url}${params}`;
  }

  private headers(opts: IReachOptions) {
    const headers = this.combineHeaders(opts.headers);
    const csrfCookie = this.reachService.getCSRFHeaderToken();
    if (csrfCookie) headers.append(...csrfCookie);

    if (opts.bearerToken) {
      headers.append('Authorization', `Bearer ${opts.bearerToken}`);
    }

    if (this.reachService.socketIds) {
      headers.append('X-WebSocket-Id', this.reachService.socketIds.join(' '));
    }

    switch (opts.type) {
      case 'multipart/form-data':
        break;
      case 'application/x-www-form-urlencoded':
        headers.delete('Content-Type');
        headers.append('Content-Type', opts.type);
        break;
      default:
        headers.delete('Content-Type');
        headers.append('Content-Type', 'application/json');
        break;
    }

    return headers;
  }

  private combineHeaders(headers?: { [key: string]: string }) {
    const _headers = new Headers(this.reachService.headers());

    if (!headers) {
      return _headers;
    }

    for (const header in headers) {
      _headers.set(header, headers[header]);
    }

    return _headers;
  }

  private async error(res: Response, logoutOpts?: IReachOptionsLogoutOptions) {
    console.error('Response error:', res);
    if (logoutOpts && res.status === logoutOpts.status) {
      this.reachService.logout(res.clone());
    }

    if (!res.bodyUsed && res.headers.get('Content-Type')?.match('application/json')) {
      throw new ReachError(res, await res.json());
    } else {
      throw new ReachError(res);
    }
  }
}
