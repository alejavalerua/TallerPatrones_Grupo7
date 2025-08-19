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
    }): import(".prisma/client").Prisma.PrismaPromise<{
        priority: bigint;
        status: bigint;
        assignee_id: bigint | null;
        customer_id: bigint | null;
        id: bigint;
        title: string;
        description: string;
        created_at: Date;
        updated_at: Date | null;
    }[]>;
    findOne(id: bigint): import(".prisma/client").Prisma.Prisma__ticketsClient<{
        priority: bigint;
        status: bigint;
        assignee_id: bigint | null;
        customer_id: bigint | null;
        id: bigint;
        title: string;
        description: string;
        created_at: Date;
        updated_at: Date | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateTicketDto): Promise<{
        priority: bigint;
        status: bigint;
        assignee_id: bigint | null;
        customer_id: bigint | null;
        id: bigint;
        title: string;
        description: string;
        created_at: Date;
        updated_at: Date | null;
    }>;
    update(id: bigint, dto: UpdateTicketDto): Promise<{
        priority: bigint;
        status: bigint;
        assignee_id: bigint | null;
        customer_id: bigint | null;
        id: bigint;
        title: string;
        description: string;
        created_at: Date;
        updated_at: Date | null;
    }>;
    delete(id: bigint): import(".prisma/client").Prisma.Prisma__ticketsClient<{
        priority: bigint;
        status: bigint;
        assignee_id: bigint | null;
        customer_id: bigint | null;
        id: bigint;
        title: string;
        description: string;
        created_at: Date;
        updated_at: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
