import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe, BadRequestException } from '@nestjs/common';
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
    const toBI = (v?: string) => v == null || v === '' ? undefined : BigInt(v);
    return this.ticketsService.findAll({
      status: toBI(status),
      priority: toBI(priority),
      assignee_id: toBI(assignee_id),
      customer_id: toBI(customer_id),
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      search,
    });
  }


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

  @Get(':id')
  findOne(@Param('id') id: string) {
  try {
    return this.ticketsService.findOne(BigInt(id));
  } catch {
    throw new BadRequestException('id inválido');
  }
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

  @Patch(':id/assign')
  assign(@Param('id') id: string, @Body() body: any) {
    const val = body.assignee_id;
    const assignee = (val === null || val === 'null') ? null : BigInt(val);
    return this.ticketsService.assign(BigInt(id), assignee);
  }

  @Patch(':id/status')
  setStatus(@Param('id') id: string, @Body() body: any) {
    return this.ticketsService.setStatus(BigInt(id), BigInt(body.status));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.delete(BigInt(id));
  }


}
