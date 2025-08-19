import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

  // GET /tickets?status=1&priority=2&assignee_id=10&customer_id=20&skip=0&take=20&search=foo
    @Get()
    findAll(
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('assignee_id') assignee_id?: string,
    @Query('customer_id') customer_id?: string,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
    @Query('search') search?: string,
  ) {
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(BigInt(id));
  }

  @Post()
  create(@Body() body: any) {
    // Convertir strings a bigint si vienen así desde el front
    const dto: CreateTicketDto = {
      title: body.title,
      description: body.description,
      status: body.status !== undefined ? BigInt(body.status) : undefined,
      priority: body.priority !== undefined ? BigInt(body.priority) : undefined,
      customer_id: body.customer_id !== undefined ? BigInt(body.customer_id) : undefined,
      assignee_id: body.assignee_id !== undefined ? BigInt(body.assignee_id) : undefined,
    };
    return this.ticketsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const dto: UpdateTicketDto = {
      title: body.title,
      description: body.description,
      status: body.status !== undefined ? BigInt(body.status) : undefined,
      priority: body.priority !== undefined ? BigInt(body.priority) : undefined,
      customer_id: body.customer_id !== undefined ? BigInt(body.customer_id) : undefined,
      assignee_id: body.assignee_id !== undefined ? BigInt(body.assignee_id) : undefined,
    };
    return this.ticketsService.update(BigInt(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.delete(BigInt(id));
  }

  // en tickets.controller.ts (o crea un LookupsController)
@Get('/lookups')
async lookups() {
  const [statuses, priorities, agents, customers] = await Promise.all([
    this.ticketsService['prisma'].ticket_status.findMany({ orderBy: { id: 'asc' } }),
    this.ticketsService['prisma'].priority.findMany({ orderBy: { id: 'asc' } }),
    this.ticketsService['prisma'].profiles.findMany({ where: { role: 2 } }), // 2 = AGENT
    this.ticketsService['prisma'].profiles.findMany({ where: { role: 1 } }), // 1 = CUSTOMER
  ]);
  return { statuses, priorities, agents, customers };
}


}
