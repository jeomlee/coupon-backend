// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouponModule } from './coupon/coupon.module'; // ✅ 이거 추가됐는지 확인

@Module({
  imports: [CouponModule], // ✅ 이 줄이 있어야 /coupons 가 살아
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

