import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
    private readonly logger = new Logger(NotificationsService.name);

    async sendNotification(userId: string, message: string, type: 'EMAIL' | 'SLACK' = 'SLACK') {
        // Mocking notification sending
        this.logger.log(`[${type}] Sending notification to user ${userId}: ${message}`);
        // In a real app, integrate with SendGrid, Slack API, etc.
        return { success: true, timestamp: new Date() };
    }

    async notifyStatusChange(poNumber: string, oldStatus: string, newStatus: string, userId: string) {
        const message = `Purchase Order ${poNumber} status changed from ${oldStatus} to ${newStatus}.`;
        return this.sendNotification(userId, message);
    }
}
