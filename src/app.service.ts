import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(User)
        private _userRepo: Repository<User>
    ) {

    }

    getAll(): Promise<User[]> {
        return this._userRepo.find();
    }

    getHello(): string {
        return 'Hello World1!';
    }
}
