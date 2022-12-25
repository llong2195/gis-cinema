import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { TRANSCODING_QUEUE } from './queue.service';

@Processor(TRANSCODING_QUEUE)
export class QueueProcessor {
  @Process()
  transcode({ data }: Job) {
    console.log(data);
  }
}
