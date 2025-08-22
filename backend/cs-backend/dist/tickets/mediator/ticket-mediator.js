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
exports.TicketMediator = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TicketMediator = class TicketMediator {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async notifyStatusChange(ticketId, newStatus) {
        await this.prisma.tickets.update({
            where: { id: ticketId },
            data: {
                status: newStatus,
                updated_at: new Date()
            }
        });
        console.log(`Ticket ${ticketId} changed status to ${newStatus}`);
    }
    async notifyAssigneeChange(ticketId, newAssigneeId) {
        await this.prisma.tickets.update({
            where: { id: ticketId },
            data: {
                assignee_id: newAssigneeId,
                updated_at: new Date()
            }
        });
        console.log(`Ticket ${ticketId} assigned to ${newAssigneeId}`);
    }
    async notifyPriorityChange(ticketId, newPriority) {
        await this.prisma.tickets.update({
            where: { id: ticketId },
            data: {
                priority: newPriority,
                updated_at: new Date()
            }
        });
        console.log(`Ticket ${ticketId} priority changed to ${newPriority}`);
    }
};
exports.TicketMediator = TicketMediator;
exports.TicketMediator = TicketMediator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketMediator);
//# sourceMappingURL=ticket-mediator.js.map