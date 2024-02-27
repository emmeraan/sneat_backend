import { BullModule } from '@nestjs/bull';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class QueueModule {
  static async forRoot(): Promise<DynamicModule> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      module: QueueModule,
      imports: [
        BullModule.forRoot({
          redis: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
          },
        })
      ],
    };
  }
}