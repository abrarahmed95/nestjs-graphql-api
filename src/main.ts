import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api/v1', {
  //   exclude: [
  //     { path: 'status', method: RequestMethod.GET },
  //     { path: 'api-docs', method: RequestMethod.GET },
  //   ],
  // });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Intrack API')
    .setDescription('The Intrack API description')
    .setVersion('1.0')
    // .addTag('cats')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}

bootstrap();
