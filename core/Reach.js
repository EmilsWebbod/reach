"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reach = void 0;
const ReachBody_1 = require("./ReachBody");
class Reach {
    constructor(reachService) {
        this.reachService = reachService;
    }
    api(path, optsOverride) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const opts = Object.assign(Object.assign({ method: 'GET' }, this.reachService.options()), (optsOverride || {}));
                const url = this.url(path, opts);
                const headers = this.headers(opts);
                const body = ReachBody_1.ReachBody.get(opts);
                const response = yield fetch(url, {
                    method: opts.method,
                    headers,
                    body,
                    mode: opts.mode,
                    credentials: opts.credentials,
                });
                let data = null;
                if (response.status < 300) {
                    data = opts.noJson ? response : yield response.json();
                }
                else {
                    throw response.clone();
                }
                if (!data) {
                    throw response.clone();
                }
                return data;
            }
            catch (e) {
                throw e;
            }
        });
    }
    url(path, opts) {
        let url = opts.usePathAsUrl ? '' : this.reachService.url;
        url += path ? `/${path}` : '';
        let params = '';
        if (opts.query) {
            params = `?${new URLSearchParams(opts.query).toString()}`;
        }
        return `${url}${params}`;
    }
    headers(opts) {
        const headers = this.combineHeaders(opts.headers);
        const csrfCookie = this.reachService.getCSRFHeaderToken();
        if (csrfCookie)
            headers.append(...csrfCookie);
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
    combineHeaders(headers) {
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
exports.Reach = Reach;
