import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply unified operational version boundaries
  app.setGlobalPrefix('api');

  // Enforce strong parameter payload handling rules globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips away unauthorized payload parameters automatically
      transform: true, // Auto-casts route variables to real internal types
    }),
  );

  // Initialize interactive API design documentation system via Swagger UI
  const config = new DocumentBuilder()
    .setTitle('BD-CS Jobs API')
    .setDescription('Backend engine powering the Bangladesh CSE Career & Company Portal')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter your account access JWT token string here to access authenticated endpoints',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`\n=============================================================`);
  console.log(`🚀 Portal engine successfully launched on port: ${port}`);
  console.log(`📄 Open Swagger UI interactive playground at: http://localhost:${port}/api/docs `);
  console.log(`=============================================================\n`);
}
bootstrap();