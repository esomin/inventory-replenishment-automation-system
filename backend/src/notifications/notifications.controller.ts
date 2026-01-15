import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Post('test')
    async testNotification(@Body() body: { userId: string; message: string; type?: 'EMAIL' | 'SLACK' }) {
        return this.notificationsService.sendNotification(body.userId, body.message, body.type);
    }
}
