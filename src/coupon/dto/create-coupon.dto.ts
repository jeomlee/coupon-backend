// src/coupon/dto/create-coupon.dto.ts
export class CreateCouponDto {
    title: string;        // 쿠폰 이름 (필수)
    brand?: string;       // 브랜드 (선택)
    expireAt?: string;    // '2025-12-31' 형식 문자열로 받자
    status?: string;      // active / used / expired
  }
  