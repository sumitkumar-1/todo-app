import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TodoModule } from './todo/todo.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthMiddleware } from './auth/auth.middleware';
import { AppService } from './app.service';

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthMiddleware
  }, AppService],
})
export class AppModule {}
