import { Injectable } from '@nestjs/common';
import { Notification } from 'src/entities/notification.entity';
import { NewNotificationDto } from 'src/dto/new-notification.dto';
import { DataSource, FindManyOptions } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectDataSource() 
        private dataSource: DataSource
    ) {}

    async create(data: NewNotificationDto): Promise<any> {
        try {
            return await this.dataSource.getRepository(Notification).save(data)
        } catch (error) {
            throw new Error(`Error creating a new notification: ${error.message}`)
        }
    }

    async getLastResults(userId: number): Promise<object[]> {
        try {
            const results = await this.dataSource.getRepository(Notification).find({
                where: {
                    user_id: userId,
                },
                order: {
                    id: 'DESC',
                },
                take: 5,
            });
    
            return results;
        } catch (error) {
            throw new Error(`Error getting results: ${error.message}`);
        }
    }
    
}
