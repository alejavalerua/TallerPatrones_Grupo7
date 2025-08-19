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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TicketsService = class TicketsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(params) {
        const { status, priority, assignee_id, customer_id, skip, take, search } = params || {};
        return this.prisma.tickets.findMany({
            where: {
                status,
                priority,
                assignee_id,
                customer_id,
                ...(search
                    ? { OR: [{ title: { contains: search, mode: 'insensitive' } },
                            { description: { contains: search, mode: 'insensitive' } }] }
                    : {}),
            },
            orderBy: { created_at: 'desc' },
            skip,
            take,
        });
    }
    findOne(id) {
        return this.prisma.tickets.findUnique({ where: { id } });
    }
    async create(dto) {
        const norm = {
            ...dto,
            status: dto.status ?? 1n,
            priority: dto.priority ?? 2n,
            customer_id: dto.customer_id ?? null,
            assignee_id: dto.assignee_id ?? null,
        };
        if (norm.customer_id !== null) {
            const exists = await this.prisma.profiles.findUnique({ where: { id: norm.customer_id } });
            if (!exists)
                throw new common_1.BadRequestException('customer_id no existe');
        }
        if (norm.assignee_id !== null) {
            const exists = await this.prisma.profiles.findUnique({ where: { id: norm.assignee_id } });
            if (!exists)
                throw new common_1.BadRequestException('assignee_id no existe');
        }
        if (norm.status !== undefined) {
            const exists = await this.prisma.ticket_status.findUnique({ where: { id: norm.status } });
            if (!exists)
                throw new common_1.BadRequestException('status no válido');
        }
        if (norm.priority !== undefined) {
            const exists = await this.prisma.priority.findUnique({ where: { id: norm.priority } });
            if (!exists)
                throw new common_1.BadRequestException('priority no válida');
        }
        return this.prisma.tickets.create({
            data: {
                title: dto.title,
                description: dto.description,
                status: dto.status ?? (1n),
                priority: dto.priority ?? (2n),
                customer_id: dto.customer_id ?? null,
                assignee_id: dto.assignee_id ?? null,
                updated_at: new Date(),
            },
        });
    }
    async update(id, dto) {
        if (dto.customer_id !== undefined && dto.customer_id !== null) {
            const exists = await this.prisma.profiles.findUnique({ where: { id: dto.customer_id } });
            if (!exists)
                throw new common_1.BadRequestException('customer_id no existe');
        }
        if (dto.assignee_id !== undefined && dto.assignee_id !== null) {
            const exists = await this.prisma.profiles.findUnique({ where: { id: dto.assignee_id } });
            if (!exists)
                throw new common_1.BadRequestException('assignee_id no existe');
        }
        if (dto.status !== undefined) {
            const exists = await this.prisma.ticket_status.findUnique({ where: { id: dto.status } });
            if (!exists)
                throw new common_1.BadRequestException('status no válido');
        }
        if (dto.priority !== undefined) {
            const exists = await this.prisma.priority.findUnique({ where: { id: dto.priority } });
            if (!exists)
                throw new common_1.BadRequestException('priority no válida');
        }
        return this.prisma.tickets.update({
            where: { id },
            data: { ...dto, updated_at: new Date(), },
        });
    }
    delete(id) {
        return this.prisma.tickets.delete({ where: { id } });
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map