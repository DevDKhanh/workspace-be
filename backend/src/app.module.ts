import { ConfigModule, ConfigService } from '@nestjs/config';

import { AccountModule } from './modules/account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL_HOST'),
        port: config.get<number>('MYSQL_PORT'),
        database: config.get<string>('MYSQL_DATABASE'),
        username: config.get<string>('MYSQL_USERNAME'),
        password: config.get<string>('MYSQL_PASSWORD'),
        // synchronize: process.env.NODE != 'production',
        autoLoadEntities: true,
        entities: ['dist/**/*.entity.{ts,js}'],
        retryAttempts: 5,
        timezone: '+07:00',
        charset: 'utf8mb4_unicode_ci',
      }),
    }),
    AuthModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
