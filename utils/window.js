"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookieValue = void 0;
function getCookieValue(key) {
    if (typeof document === 'undefined')
        return '';
    const b = document.cookie.match('(^|[^;]+)\\s*' + key + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}
exports.getCookieValue = getCookieValue;
