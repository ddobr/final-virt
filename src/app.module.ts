import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './article/article.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                return {
                    type: 'postgres',
                    autoLoadEntities: true,
                    host: config.get('DB_HOST'),
                    port: Number.parseInt(config.get('DB_PORT')),
                    username: config.get('DB_USER'),
                    password: config.get('DB_PWD'),
                    database: config.get('DB_NAME'),
                    synchronize: config.get('DB_SYNC') === 'true'
                }
            }
        }),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
