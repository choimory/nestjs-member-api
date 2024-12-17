import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './v1/member/member.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces/config-module-options.interface';
import Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    MemberModule,
    ConfigModule.forRoot({
      // 실행할 .env 파일을 지정
      // 실행 명령어로 전달받은 NODE_ENV 값으로 파일명을 구분하여 해당 실행환경 로드
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',

      // ConfigModule 전역 설정
      isGlobal: true,

      // Joi를 이용해 .env 값들을 검증
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

    // TypeORM 설정
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      schema: process.env.DB_SCHEMA,
      autoLoadEntities: true,
      logging: !(process.env.NODE_ENV === 'prod'),
      synchronize: process.env.NODE_ENV === 'local',
      namingStrategy: new SnakeNamingStrategy(),
    } as TypeOrmModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
