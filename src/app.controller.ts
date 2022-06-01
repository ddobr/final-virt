import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.entity';

@Controller({ path: 'test' })
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @HttpCode(200)
    public getHello(): string {
        return this.appService.getHello();
    }

    @Get('users')
    public getUsers(): Promise<User[]> {
        return this.appService.getAll();
    }
}
