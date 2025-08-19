"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const tickets_service_1 = require("./tickets.service");
let TicketsController = class TicketsController {
    ticketsService;
    constructor(ticketsService) {
        this.ticketsService = ticketsService;
    }
    findAll(status, priority, assignee_id, customer_id, skip, take, search) {
        return this.ticketsService.findAll({
            status: status ? BigInt(status) : undefined,
            priority: priority ? BigInt(priority) : undefined,
            assignee_id: assignee_id ? BigInt(assignee_id) : undefined,
            customer_id: customer_id ? BigInt(customer_id) : undefined,
            skip,
            take,
            search,
        });
    }
    findOne(id) {
        return this.ticketsService.findOne(BigInt(id));
    }
    create(body) {
        const dto = {
            title: body.title,
            description: body.description,
            status: body.status !== undefined ? BigInt(body.status) : undefined,
            priority: body.priority !== undefined ? BigInt(body.priority) : undefined,
            customer_id: body.customer_id !== undefined ? BigInt(body.customer_id) : undefined,
            assignee_id: body.assignee_id !== undefined ? BigInt(body.assignee_id) : undefined,
        };
        return this.ticketsService.create(dto);
    }
    update(id, body) {
        const dto = {
            title: body.title,
            description: body.description,
            status: body.status !== undefined ? BigInt(body.status) : undefined,
            priority: body.priority !== undefined ? BigInt(body.priority) : undefined,
            customer_id: body.customer_id !== undefined ? BigInt(body.customer_id) : undefined,
            assignee_id: body.assignee_id !== undefined ? BigInt(body.assignee_id) : undefined,
        };
        return this.ticketsService.update(BigInt(id), dto);
    }
    remove(id) {
        return this.ticketsService.delete(BigInt(id));
    }
    async lookups() {
        const [statuses, priorities, agents, customers] = await Promise.all([
            this.ticketsService['prisma'].ticket_status.findMany({ orderBy: { id: 'asc' } }),
            this.ticketsService['prisma'].priority.findMany({ orderBy: { id: 'asc' } }),
            this.ticketsService['prisma'].profiles.findMany({ where: { role: 2 } }),
            this.ticketsService['prisma'].profiles.findMany({ where: { role: 1 } }),
        ]);
        return { statuses, priorities, agents, customers };
    }
};
exports.TicketsController = TicketsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('priority')),
    __param(2, (0, common_1.Query)('assignee_id')),
    __param(3, (0, common_1.Query)('customer_id')),
    __param(4, (0, common_1.Query)('skip', new common_1.ParseIntPipe({ optional: true }))),
    __param(5, (0, common_1.Query)('take', new common_1.ParseIntPipe({ optional: true }))),
    __param(6, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, Number, String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/lookups'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "lookups", null);
exports.TicketsController = TicketsController = __decorate([
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);
//# sourceMappingURL=tickets.controller.js.map