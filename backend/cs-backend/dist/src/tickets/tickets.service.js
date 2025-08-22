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
const ticket_mediator_1 = require("./mediator/ticket-mediator");
class BaseTicket {
    dto;
    status;
    priority;
    constructor(dto, status = 1n, priority = 2n) {
        this.dto = dto;
        this.status = status;
        this.priority = priority;
    }
    getTitle() { return this.dto.title; }
    getDescription() { return this.dto.description; }
    getPriority() { return this.priority; }
    getStatus() { return this.status; }
    getCustomerId() { return this.dto.customer_id ?? null; }
    getAssigneeId() { return this.dto.assignee_id ?? null; }
    toJSON() {
        return {
            title: this.getTitle(),
            description: this.getDescription(),
            status: this.getStatus(),
            priority: this.getPriority(),
            customer_id: this.getCustomerId(),
            assignee_id: this.getAssigneeId()
        };
    }
}
class UrgentTicketDecorator {
    ticket;
    constructor(ticket) {
        this.ticket = ticket;
    }
    getTitle() { return `🚨 URGENTE: ${this.ticket.getTitle()}`; }
    getDescription() { return `${this.ticket.getDescription()}\n[Atención inmediata requerida]`; }
    getPriority() { return 3n; }
    getStatus() { return this.ticket.getStatus(); }
    getCustomerId() { return this.ticket.getCustomerId(); }
    getAssigneeId() { return this.ticket.getAssigneeId(); }
    toJSON() {
        return {
            ...this.ticket.toJSON(),
            title: this.getTitle(),
            description: this.getDescription(),
            priority: this.getPriority(),
            isUrgent: true
        };
    }
}
let TicketsService = class TicketsService {
    prisma;
    mediator;
    constructor(prisma, mediator) {
        this.prisma = prisma;
        this.mediator = mediator;
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
                    ? { OR: [
                            { title: { contains: search, mode: 'insensitive' } },
                            { description: { contains: search, mode: 'insensitive' } },
                        ] }
                    : {}),
            },
            orderBy: { created_at: 'desc' },
            skip,
            take,
            include: {
                ticket_status: true,
                priority_tickets_priorityTopriority: true,
                profiles_tickets_assignee_idToprofiles: { select: { id: true, name: true, email: true } },
                profiles_tickets_customer_idToprofiles: { select: { id: true, name: true, email: true } },
            },
        });
    }
    findOne(id) {
        return this.prisma.tickets.findUnique({
            where: { id },
            include: {
                ticket_status: true,
                priority_tickets_priorityTopriority: true,
                profiles_tickets_assignee_idToprofiles: { select: { id: true, name: true, email: true } },
                profiles_tickets_customer_idToprofiles: { select: { id: true, name: true, email: true } },
            },
        });
    }
    async create(dto) {
        let ticket = new BaseTicket(dto);
        if (dto.priority && dto.priority >= 3n) {
            ticket = new UrgentTicketDecorator(ticket);
        }
        const ticketData = ticket.toJSON();
        return this.prisma.tickets.create({
            data: {
                ...ticketData,
                updated_at: new Date()
            }
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
    async assign(id, assignee_id) {
        if (assignee_id !== null) {
            const agent = await this.prisma.profiles.findUnique({ where: { id: assignee_id } });
            if (!agent)
                throw new common_1.BadRequestException('assignee_id no existe');
        }
        await this.mediator.notifyAssigneeChange(id, assignee_id);
        return this.prisma.tickets.findUnique({
            where: { id },
            include: { ticket_status: true, profiles_tickets_assignee_idToprofiles: true },
        });
    }
    async setStatus(id, status) {
        const exists = await this.prisma.ticket_status.findUnique({ where: { id: status } });
        if (!exists)
            throw new common_1.BadRequestException('status no válido');
        await this.mediator.notifyStatusChange(id, status);
        return this.prisma.tickets.findUnique({
            where: { id },
            include: { ticket_status: true },
        });
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ticket_mediator_1.TicketMediator])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map