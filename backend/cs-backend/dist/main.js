"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bigint_interceptor_1 = require("./common/interceptors/bigint.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new bigint_interceptor_1.BigIntInterceptor());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map