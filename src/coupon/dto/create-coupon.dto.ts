// src/coupon/dto/create-coupon.dto.ts
export class CreateCouponDto {
  title: string;
  brand?: string | null;
  expireAt?: string | null;
  imageUrl?: string | null;

  // ✅ 여기 추가
  couponNumber?: string | null; // 쿠폰/기프티콘 번호
  barcode?: string | null;      // 바코드 값 (숫자/문자열)
}
