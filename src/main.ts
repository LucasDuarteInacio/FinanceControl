import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Finance Control')
    .setDescription('Service to manage a finance control app')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Finance Control Documentation API',
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document, customOptions);
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
