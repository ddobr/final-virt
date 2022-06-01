import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'c-c9qen9t73n9flu2jr7ku.rw.mdb.yandexcloud.net',
            port: 6432,
            username: 'user1',
            password: 'qwerty123',
            database: 'db',
            entities: [User],
            synchronize: true,
          }),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
