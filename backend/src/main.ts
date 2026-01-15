import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for development
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend server listening on port ${port}`);
}

bootstrap();
