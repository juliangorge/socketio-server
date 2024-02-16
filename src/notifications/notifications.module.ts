import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { SocketModule } from '../socket/socket.module';
import { Notification } from 'src/entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Notification]), SocketModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
