import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
export declare class TicketsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(params?: {
        status?: bigint;
        priority?: bigint;
        assignee_id?: bigint;
        customer_id?: bigint;
        skip?: number;
        take?: number;
        search?: string;
    }): import(".prisma/client").Prisma.PrismaPromise<({
        profiles_tickets_assignee_idToprofiles: {
            id: bigint;
            email: string;
            name: string | null;
        } | null;
        profiles_tickets_customer_idToprofiles: {
            id: bigint;
            email: string;
            name: string | null;
        } | null;
        priority_tickets_priorityTopriority: {
            id: bigint;
            priority: string;
        };
        ticket_status: {
            id: bigint;
            status: string;
        };
    } & {
        id: bigint;
        title: string;
        description: string;
        status: bigint;
        priority: bigint;
        customer_id: bigint | null;
        assignee_id: bigint | null;
        created_at: Date;
        updated_at: Date | null;
    })[]>;
    findOne(id: bigint): import(".prisma/client").Prisma.Prisma__ticketsClient<({
        profiles_tickets_assignee_idToprofiles: {
            id: bigint;
            email: string;
            name: string | null;
        } | null;
        profiles_tickets_customer_idToprofiles: {
            id: bigint;
            email: string;
            name: string | null;
        } | null;
        priority_tickets_priorityTopriority: {
            id: bigint;
            priority: string;
        };
        ticket_status: {
            id: bigint;
            status: string;
        };
    } & {
        id: bigint;
        title: string;
        description: string;
        status: bigint;
        priority: bigint;
        customer_id: bigint | null;
        assignee_id: bigint | null;
        created_at: Date;
        updated_at: Date | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateTicketDto): Promise<{
        id: bigint;
        title: string;
        description: string;
        status: bigint;
        priority: bigint;
        customer_id: bigint | null;
        assignee_id: bigint | null;
        created_at: Date;
        updated_at: Date | null;
    }>;
    update(id: bigint, dto: UpdateTicketDto): Promise<{
        id: bigint;
        title: string;
        description: string;
        status: bigint;
        priority: bigint;
        customer_id: bigint | null;
        assignee_id: bigint | null;
        created_at: Date;
        updated_at: Date | null;
    }>;
    delete(id: bigint): import(".prisma/client").Prisma.Prisma__ticketsClient<{
        id: bigint;
        title: string;
        description: string;
        status: bigint;
        priority: bigint;
        customer_id: bigint | null;
        assignee_id: bigint | null;
        created_at: Date;
        updated_at: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    assign(id: bigint, assignee_id: bigint | null): Promise<{
        profiles_tickets_assignee_idToprofiles: {
            id: bigint;
            created_at: Date;
            email: string;
            name: string | null;
            role: number;
        } | null;
        ticket_status: {
            id: bigint;
            status: string;
        };
    } & {
        id: bigint;
        title: string;
        description: string;
        status: bigint;
        priority: bigint;
        customer_id: bigint | null;
        assignee_id: bigint | null;
        created_at: Date;
        updated_at: Date | null;
    }>;
    setStatus(id: bigint, status: bigint): Promise<{
        ticket_status: {
            id: bigint;
            status: string;
        };
    } & {
        id: bigint;
        title: string;
        description: string;
        status: bigint;
        priority: bigint;
        customer_id: bigint | null;
        assignee_id: bigint | null;
        created_at: Date;
        updated_at: Date | null;
    }>;
}
