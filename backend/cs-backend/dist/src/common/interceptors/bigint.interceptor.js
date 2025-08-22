"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigIntInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
function serializeBigInt(value) {
    if (typeof value === 'bigint') {
        return value.toString();
    }
    if (Array.isArray(value)) {
        return value.map(serializeBigInt);
    }
    if (value && typeof value === 'object') {
        if (value instanceof Date)
            return value;
        const out = {};
        for (const [k, v] of Object.entries(value)) {
            out[k] = serializeBigInt(v);
        }
        return out;
    }
    return value;
}
let BigIntInterceptor = class BigIntInterceptor {
    intercept(_context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => serializeBigInt(data)));
    }
};
exports.BigIntInterceptor = BigIntInterceptor;
exports.BigIntInterceptor = BigIntInterceptor = __decorate([
    (0, common_1.Injectable)()
], BigIntInterceptor);
//# sourceMappingURL=bigint.interceptor.js.map