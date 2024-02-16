import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Controller, Get, Param, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../auth/guard/jwt-auth.guard';
import { SocketService } from '../socket/socket.service';
import { NotificationsService } from './notifications.service';
import { NewNotificationDto } from 'src/dto/new-notification.dto';


@Controller('notifications')
export class NotificationsController {
  constructor(
    private socketService: SocketService,
    private notificationsService: NotificationsService
  ) {}

  // Next step: add auth

  @Post()
  @Public()
  //@UseGuards(AuthGuard('basic'))
  async emit(@Body() data: NewNotificationDto): Promise<any> {
    await this.notificationsService.create(data)
  
    const content = await this.notificationsService.getLastResults(data.user_id)
  
    await this.socketService.emit('getNotifications', content, data.user_id.toString());
    return content;
  }
  
}
