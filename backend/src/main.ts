import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: '*',
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'authorization'],
        methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
    });
    app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));

    /*Swagger documentation */
    const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
        .setTitle('NestJS API')
        .setDescription('API of the yacht application')
        .setVersion('1.0')
        .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
void bootstrap();
