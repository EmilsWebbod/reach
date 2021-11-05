"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReachService = void 0;
const utils_1 = require("./utils");
class ReachService {
    constructor(_url, opts) {
        this._url = _url;
        this.opts = opts;
        this.refreshingToken = false;
    }
    url() {
        return this._url;
    }
    headers() {
        return this.opts.headers || new Headers();
    }
    options() {
        return this.opts.options || {};
    }
    getCSRFHeaderToken() {
        if (this.opts.csrf) {
            const csrfCookie = (0, utils_1.getCookieValue)(this.opts.csrf.cookie);
            if (csrfCookie)
                return ['X-CSRF-Token', csrfCookie];
        }
        return null;
    }
    logout(response) {
        if (this.opts.logout)
            this.opts.logout(response);
    }
}
exports.ReachService = ReachService;
