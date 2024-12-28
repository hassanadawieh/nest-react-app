import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [UserService, PrismaService],
})
export class UserModule {}
