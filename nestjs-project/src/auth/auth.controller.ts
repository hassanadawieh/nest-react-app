import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto'; // Import RegisterDto
import { LoginDto } from './dto/login.dto'; // Import LoginDto
import { ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Register a new user
  @Post('register')
  async register(@Body(new ValidationPipe()) body: RegisterDto) {
    return this.authService.register(body.name, body.email, body.password);
  }

  // Login an existing user
  @Post('login')
  async login(@Body(new ValidationPipe()) body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}
