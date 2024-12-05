# 프로젝트 생성

```shell
nest new nest-member-api --strict
```

# 도메인 생성

```shell
# 아래 모든 내용 일괄 생성
nest g res member

# 컨트롤러
nest g co member

# 서비스
nest g s member

# 모듈
nest g mo member
```

- 문제시 node 버전 변경 (`nvm install 16`, `nvm use 16`)
- nestcli 재설치 (`npm uninstall -g @nestjs/cli`, `npm install -g @nestjs/cli`)
- npm 캐시 삭제 (`npm cache clean --force`)
- 프로젝트 의존성 재설치 (`rm -rf node_modules package-lock.json`, `npm install`)

# 프리티어 포맷팅 실행

```shell
# 단일파일
npx prettier --write path/to/your/file.js

# 전체
npx prettier --write .

# IntelliJ 포매팅 단축키 설정
설정에서 prettier 검색해서 JavaScript->Prettier 이동 후, 
Manual... 선택 후, 하위 항목의 Run on Reformat code action 선택 
```

# 실행환경 (.env) 설정

```shell
# 문서
https://docs.nestjs.com/techniques/configuration

# nest.js config 라이브러리 설치
npm i --save @nestjs/config

# 운영체제 구분 없이 사용 가능하게 해주는 라이브러리 설치
npm install -D cross-env

# env 파일 생성
.env
.env.development
.env.production
```

- 기본 설정

```typescript
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
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

- AppModule에 ConfigModule.forRoot 작성
- 프로필을 NODE_ENV로 보내 해당 파일 읽도록 함

```shell
NODE_ENV=development npm run start
NODE_ENV=production npm run start:prod
NODE_ENV=test npm run test
```

- NODE_ENV에 구분값 주면서 실행하는 커맨드

```json
"scripts": {
  "start:dev": "NODE_ENV=development nest start",
  "start:prod": "NODE_ENV=production nest start",
  "start:test": "NODE_ENV=test nest start"
}
```

- 간결한 커맨드 적용되도록 package.json의 script 변경

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT'); // .env의 PORT 값 가져오기

  await app.listen(port || 3000);
}

bootstrap();
```

- main.ts에 포트 적용

```typescript
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return (
      'Hello World! - ' +
      'PROFILE:' +
      this.configService.get('PROFILE') +
      ', PORT:' +
      this.configService.get('PORT')
    );
  }
}
```

- app.service.ts에 프로필 정보 출력
