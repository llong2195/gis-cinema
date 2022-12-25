import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

export const TRANSCODING_QUEUE = 'transcode';

@Injectable()
export class QueueService {
  constructor(@InjectQueue(TRANSCODING_QUEUE) private queue: Queue) {}

  transcode() {
    void this.queue.add({
      file: 'audio.mp3',
    });
  }
}
