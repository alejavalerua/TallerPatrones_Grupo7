import { TicketsService } from './tickets.service';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    findAll(status?: string, priority?: string, assignee_id?: string, customer_id?: string, skip?: number, take?: number, search?: string): import(".prisma/client").Prisma.PrismaPromise<({
        ticket_status: {
            id: bigint;
            status: string;
        };
        profiles_tickets_assignee_idToprofiles: {
            id: bigint;
            name: string | null;
            email: string;
        } | null;
        profiles_tickets_customer_idToprofiles: {
            id: bigint;
            name: string | null;
            email: string;
        } | null;
        priority_tickets_priorityTopriority: {
            priority: string;
            id: bigint;
        };
    } & {
        priority: bigint;
        id: bigint;
        title: string;
        description: string;
        status: bigint;
        customer_id: bigint | null;
        assignee_id: bigint | null;
        created_at: Date;
        updated_at: Date | null;
    })[]>;
    lookups(): Promise<{
        statuses: {
            id: bigint;
            status: string;
        }[];
        priorities: {
            priority: string;
            id: bigint;
        }[];
        agents: {
            id: bigint;
            created_at: Date;
            name: string | null;
            email: string;
            role: number;
        }[];
        customers: {
            id: bigint;
            created_at: Date;
            name: string | null;
            email: string;
            role: number;
        }[];
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ticketsClient<({
        ticket_status: {
            id: bigint;
            status: string;
        };
        profiles_tickets_assignee_idToprofiles: {
            id: bigint;
            name: string | null;
            email: string;
        } | null;
        profiles_tickets_customer_idToprofiles: {
            id: bigint;
            name: string | null;
            email: string;
        } | null;
        priority_tickets_priorityTopriority: {
            priority: string;
            id: bigint;
        };
    } & {
        priority: bigint;
        id: bigint;
        title: string;
        description: string;
        status: bigint;
        customer_id: bigint | null;
        assignee_id: bigint | null;
        created_at: Date;
        updated_at: Date | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(body: any): Promise<{
        priority: bigint;
        id: bigint;
        title: string;
        description: string;
        status: bigint;
        customer_id: bigint | null;
        assignee_id: bigint | null;
        created_at: Date;
        updated_at: Date | null;
    }>;
    update(id: string, body: any): Promise<{
        priority: bigint;
        id: bigint;
        title: string;
        description: string;
        status: bigint;
        customer_id: bigint | null;
        assignee_id: bigint | null;
        created_at: Date;
        updated_at: Date | null;
    }>;
    assign(id: string, body: any): Promise<{
        ticket_status: {
            id: bigint;
            status: string;
        };
        profiles_tickets_assignee_idToprofiles: {
            id: bigint;
            created_at: Date;
            name: string | null;
            email: string;
            role: number;
        } | null;
    } & {
        priority: bigint;
        id: bigint;
        title: string;
        description: string;
        status: bigint;
        customer_id: bigint | null;
        assignee_id: bigint | null;
        created_at: Date;
        updated_at: Date | null;
    }>;
    setStatus(id: string, body: any): Promise<{
        ticket_status: {
            id: bigint;
            status: string;
        };
    } & {
        priority: bigint;
        id: bigint;
        title: string;
        description: string;
        status: bigint;
        customer_id: bigint | null;
        assignee_id: bigint | null;
        created_at: Date;
        updated_at: Date | null;
    }>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ticketsClient<{
        priority: bigint;
        id: bigint;
        title: string;
        description: string;
        status: bigint;
        customer_id: bigint | null;
        assignee_id: bigint | null;
        created_at: Date;
        updated_at: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
