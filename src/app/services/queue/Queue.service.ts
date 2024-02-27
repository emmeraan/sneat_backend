import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';


@Injectable()
export class QueueService {
  public Queues: any = {};
  constructor( 
    @InjectQueue(process.env.DEFAULT_QUEUE_NAME) private readonly defaultQueue: Queue,
  ) {    
    this[process.env.DEFAULT_QUEUE_NAME] = this.defaultQueue;
  }

  public async addJob(jobName, data,queueName = process.env.DEFAULT_QUEUE_NAME) {
    return await this[queueName].add(jobName,data);
  }
}
