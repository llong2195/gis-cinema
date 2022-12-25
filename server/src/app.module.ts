import appConfig from '@config/app.config';
import authConfig from '@config/auth.config';
import databaseConfig from '@config/database.config';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { AllExceptionFilter } from './filter/exception.filter';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ValidatorsModule } from '@validators/validators.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CommanderModule } from './commander/commander.module';
import { RedisModule } from '@src/modules/redis/redis.module';
import { FileModule } from './modules/file/file.module';
import { CinemaModule } from './modules/cinema/cinema.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development.local', '.env.development'],
      load: [appConfig, databaseConfig, authConfig],
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', '/public'),
      serveRoot: '/',
      exclude: ['/api/*', '/auth/*'],
    }),

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        ({
          ttl: config.get<number>('THROTTLE_TTL'),
          limit: config.get<number>('THROTTLE_LIMIT'),
        } as ThrottlerModuleOptions),
    }),

    LoggerModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    FileModule,
    ValidatorsModule,
    // RedisModule,
    CommanderModule,
    CinemaModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
