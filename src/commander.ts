import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import { CommanderModule } from '@src/commander/commander.module';

async function bootstrap() {
    await CommandFactory.run(AppModule, ['warn', 'error']);
}

bootstrap();
