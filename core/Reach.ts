import {ReachBody} from './ReachBody';
import {ReachService} from './ReachService';
import {IReachOptions} from '../types';

export class Reach {

  private busy = false;

  constructor(private reachService: ReachService) {
  }

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

      if (response.status < 300) {
        data = opts.noJson ? response : await response.json();
      } else {
        throw response.clone();
      }

      if (!data) {
        throw response.clone();
      }

      return data;
    } catch (e) {
      throw e;
    } finally {
      this.busy = false;
    }
  }

  private url(path: string, opts: IReachOptions) {
    let url = opts.usePathAsUrl ? '' : this.reachService.url;
    url += path ? `/${path}` : '';
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
}