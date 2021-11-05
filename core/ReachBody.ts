import {IReachBody, IReachOptions} from '../types';

export class ReachBody {

  static get(opts: IReachOptions): FormData | string | undefined {
    opts.body = opts.body ? { ...opts.body } : {};
    return Object.keys(opts.body).length > 0 ? ReachBody.parse(opts) : undefined;
  }

  static parse(opts: IReachOptions) {
    const contentType = opts.type ? opts.type : 'application/json';
    const body = { ...opts.body } as ReachBody;

    switch (contentType) {
      case 'multipart/form-data':
        return ReachBody.multipartForm(body, opts.fileKeys);
      case 'application/x-www-form-urlencoded':
        return ReachBody.encodedForm(body);
      default:
        return JSON.stringify(body);
    }
  }

  static multipartForm(
    body: IReachBody,
    fileKeys = ['file', 'files']
  ): FormData {
    const formData = new FormData();

    for (const k in body) {
      const isFile =
        body[k] instanceof File ||
        (Array.isArray(body[k]) && body[k][0] instanceof File);
      if (isFile && fileKeys.some((fk) => fk === k)) {
        if (Array.isArray(body[k])) {
          body[k].map((file: any) => formData.append(k, file));
        } else {
          formData.append(k, body[k]);
        }
      } else if (typeof body[k] === 'object' && !Array.isArray(body[k])) {
        for (const bk in body[k]) {
          if (body[k][bk] && body[k].hasOwnProperty(bk)) {
            if (typeof body[k][bk] === 'object' && !Array.isArray(body[k][bk])) {
              for (const bkk in body[k][bk]) {
                if (body[k][bk][bkk] && body[k][bk].hasOwnProperty(bkk)) {
                  formData.append(`${k}.${bk}.${bkk}`, body[k][bk][bkk]);
                }
              }
            } else {
              formData.append(`${k}.${bk}`, body[k][bk]);
            }
          }
        }
      } else {
        formData.append(k, body[k]);
      }
    }

    return formData;
  }

  static encodedForm(body: IReachBody): string {
    return Object.keys(body)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`)
      .join('&');
  }
}