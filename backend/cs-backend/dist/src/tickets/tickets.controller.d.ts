import { TicketsService } from './tickets.service';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    findAll(status?: string, priority?: string, assignee_id?: string, customer_id?: string, skip?: number, take?: number, search?: string): import(".prisma/client").Prisma.PrismaPromise<({
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
    lookups(): Promise<{
        statuses: {
            id: bigint;
            status: string;
        }[];
        priorities: {
            id: bigint;
            priority: string;
        }[];
        agents: {
            id: bigint;
            created_at: Date;
            email: string;
            name: string | null;
            role: number;
        }[];
        customers: {
            id: bigint;
            created_at: Date;
            email: string;
            name: string | null;
            role: number;
        }[];
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ticketsClient<({
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
    create(body: any): Promise<{
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
    update(id: string, body: any): Promise<{
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
    assign(id: string, body: any): Promise<({
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
    }) | null>;
    setStatus(id: string, body: any): Promise<({
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
    }) | null>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ticketsClient<{
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
}
