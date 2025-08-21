// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private static instance: PrismaService;
  // Singleton pattern to ensure only one instance of PrismaService is created
  constructor() {
    super();
    if (!PrismaService.instance) {
      PrismaService.instance = this;
    }
    return PrismaService.instance;
  }

  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
