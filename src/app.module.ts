import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces/config-module-options.interface';
import Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

@Module({
  imports: [
    MemberModule,
    ConfigModule.forRoot({
      // NODE_ENV에 따라 파일 로드
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',

      //전역변수 설정
      isGlobal: true,

      //.env 검증
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('local', 'dev', 'prod').required(),
        PORT: Joi.number().port().required(),
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    } as ConfigModuleOptions),

    TypeOrmModule.forRoot({
      type: /*process.env.DB_TYPE*/ 'postgres',
      host: process.env.DB_HOST, //'localhost',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME, //'choimory',
      password: process.env.DB_PASSWORD, //'asdqwe123',
      database: process.env.DB_DATABASE, //'choimory',
      schema: process.env.DB_SCHEMA, //'member_api',
      synchronize: process.env.NODE_ENV === 'dev',
    } as TypeOrmModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
