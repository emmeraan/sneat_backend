
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor(process.env.DEFAULT_QUEUE_NAME)
export class TestConsumer {
  
  @Process('Test')
  async transcode(job: Job<unknown>) {
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      // await doSomething(job.data);
      progress += 1;
      console.log(progress);
      await job.progress(progress);
    }
    return {'hy':'hello'};
  }
}
