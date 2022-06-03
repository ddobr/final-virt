import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { UsersModule } from './article/article.module';
import { Article } from './article/article.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'rc1b-th42tz2y4i8x34jc.mdb.yandexcloud.net',
            port: 6432, // 5432 - по дефолту; 6432 - у яндекса
            username: 'user1',
            password: 'qwerty123',
            database: 'db',
            //entities: [Article],
            // ssl: {
            //     ca: fs.readFileSync(path.resolve(__dirname, '../certs/root.crt'))
            // },
            synchronize: true,
            autoLoadEntities: true,
          }),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
