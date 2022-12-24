import { Process, Processor } from '@nestjs/bull';
import { NodemailerService, QUEUE_EMAIL } from '@src/modules/nodemailer/nodemailer.service';
import { Job } from 'bull';

@Processor(QUEUE_EMAIL)
export class mailQueueProcessor {
  constructor(private readonly nodemailer: NodemailerService) {}

  @Process()
  async processFile(job: Job) {
    await this.nodemailer.example();
  }
}
