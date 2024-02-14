import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../auth/guard/jwt-auth.guard';
import { SocketService } from '../socket/socket.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private socketService: SocketService) {}

  //@UseInterceptors(CacheInterceptor)
  @Get(':userId')
  @Public()
  //@UseGuards(AuthGuard('basic'))
  findByUserId(@Param('userId') userId: string): string {
    this.socketService.emit('getNotifications', 'content', userId)
    return 'Este será un POST y emitirá un mensaje a socket';
  }

  //@UseInterceptors(CacheInterceptor)
  @Get()
  @Public()
  //@UseGuards(AuthGuard('basic'))
  findAll(): string {
    //const userId = '1'
    this.socketService.emit('getNotifications', 'content')
    return 'Este será un POST y emitirá un mensaje a socket';
  }
}
