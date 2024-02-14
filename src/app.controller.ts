import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { CacheTTL, CacheInterceptor } from "@nestjs/cache-manager";
import { Public } from "./auth/guard/jwt-auth.guard";

@Controller()
export class AppController {

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(8*60*60) // 8 horas
  @Get()
  getHello(): string {
    return "Hello world";
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(8*60*60) // 8 horas
  @Public()
  @Get("ping")
  getPing(): string {
    return "pong!";
  }

}
