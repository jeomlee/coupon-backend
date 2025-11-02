// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // 👇 여기서 Express 타입으로 생성해야 static 사용 가능
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS 켜두면 앱에서 바로 호출 가능
  app.enableCors();

  // ✅ /uploads 경로를 실제 폴더에 매핑
  // __dirname = dist/src 라고 생각하면 됨
  // dist/src  기준으로  .. -> dist -> .. -> 프로젝트 루트
  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(3000);
  console.log('http://localhost:3000 서버 실행중');
}
bootstrap();
