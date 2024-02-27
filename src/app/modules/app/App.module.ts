import { APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseModule } from '../database/Database.module';
import { AppService } from 'src/app/services/app/App.service';
import { AuthModule } from '../auth/Auth.module';
import { MailModule } from '../mail/Mail.module';
import { QueueModule } from '../queue/Queue.module';
import { PaginateModule } from '@dev-talha-anwar/nestjs-sequelize-paginate';
import { SocketModule } from '../gateway/Socket.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserModule } from '../user/User.module';
import { AdminDashboardModule } from '../dashboard/AdminDashboard.module';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    AuthModule,
    MailModule.forRoot(),
    QueueModule.forRoot(),
    PaginateModule.forRoot({ defaultOffset: 10 }),
    SocketModule,
    UserModule,
    AdminDashboardModule
  ],
  controllers: [],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ClassSerializerInterceptor,
    // }
  ],
})
export class AppModule {}
