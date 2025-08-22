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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const realtime_gateway_1 = require("../realtime/realtime.gateway");
const toBI = (v) => v === undefined || v === null || v === '' ? undefined : BigInt(v);
let MessagesService = class MessagesService {
    prisma;
    rt;
    constructor(prisma, rt) {
        this.prisma = prisma;
        this.rt = rt;
    }
    async listByTicket(ticketId, params) {
        const ticket = await this.prisma.tickets.findUnique({ where: { id: ticketId } });
        if (!ticket)
            throw new common_1.NotFoundException('ticket no existe');
        const take = params?.take ?? 30;
        const cursorId = toBI(params?.cursor);
        return this.prisma.message.findMany({
            where: { ticket_id: ticketId },
            ...(cursorId ? { cursor: { id: cursorId }, skip: 1 } : {}),
            take,
            orderBy: { created_at: 'asc' },
            include: {
                profiles: { select: { id: true, name: true, email: true } },
            },
        });
    }
    async create(ticketId, content, senderId) {
        if (!content || !content.trim()) {
            throw new common_1.BadRequestException('content es requerido');
        }
        const [ticket, sender] = await Promise.all([
            this.prisma.tickets.findUnique({ where: { id: ticketId } }),
            this.prisma.profiles.findUnique({ where: { id: senderId } }),
        ]);
        if (!ticket)
            throw new common_1.NotFoundException('ticket no existe');
        if (!sender)
            throw new common_1.BadRequestException('sender_id no existe');
        const msg = await this.prisma.message.create({
            data: {
                content: content.trim(),
                ticket_id: ticketId,
                sender_id: senderId,
            },
            include: { profiles: { select: { id: true, name: true, email: true } } },
        });
        await this.prisma.tickets.update({
            where: { id: ticketId },
            data: { updated_at: new Date() },
        });
        this.rt.emitNewMessage(ticketId, msg);
        return msg;
    }
    async remove(ticketId, messageId) {
        const msg = await this.prisma.message.findUnique({ where: { id: messageId } });
        if (!msg || msg.ticket_id !== ticketId)
            throw new common_1.NotFoundException('mensaje no existe en este ticket');
        await this.prisma.message.delete({ where: { id: messageId } });
        return { ok: true };
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, realtime_gateway_1.RealtimeGateway])
], MessagesService);
//# sourceMappingURL=messages.service.js.map