import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific settings
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // HTTP methods to allow
    credentials: true, // Allow credentials like cookies, authorization headers, etc.
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The API documentation for our project')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
