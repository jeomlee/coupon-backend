// src/coupon/coupon.service.ts
import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';

type Coupon = {
  id: string;
  title: string;
  brand: string | null;
  expireAt: string | null;
  status: string;
};

@Injectable()
export class CouponService {
  private coupons: Coupon[] = [
    {
      id: '1',
      title: '스타벅스 아메리카노',
      brand: '스타벅스',
      expireAt: '2025-12-31',
      status: 'active',
    },
    {
      id: '2',
      title: '파리바게뜨 3,000원 쿠폰',
      brand: '파리바게뜨',
      expireAt: '2025-11-30',
      status: 'active',
    },
  ];

  findAll() {
    return this.coupons;
  }

  create(dto: CreateCouponDto) {
    const newCoupon: Coupon = {
      id: (this.coupons.length + 1).toString(),
      title: dto.title,
      brand: dto.brand ?? null,       // 없으면 null
      expireAt: dto.expireAt ?? null, // 없으면 null
      status: dto.status ?? 'active',
    };
    this.coupons.push(newCoupon);
    return newCoupon;
  }
}
