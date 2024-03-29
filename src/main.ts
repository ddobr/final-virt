import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    })

    app.useGlobalPipes(
        // Пайпа валидации дтошек
        new ValidationPipe({
            // убираем не задекорированные поля из дто
            whitelist: true,
        }),
    );

    await app.listen(3000);
}
bootstrap();
