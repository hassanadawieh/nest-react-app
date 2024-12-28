import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Import the PrismaService

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(name: string, email: string, password: string) {
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  // You can add more methods to handle CRUD operations for users
}
