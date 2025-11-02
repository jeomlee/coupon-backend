// src/coupon/coupon.service.ts
import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';

type Coupon = {
  id: string;
  title: string;
  brand: string | null;
  expireAt: string | null;
  status: string;
  imageUrl: string | null;
  couponNumber: string | null; // ✅ 추가
  barcode: string | null;      // ✅ 추가
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
      imageUrl: null,
      couponNumber: null,
      barcode: null,
    },
    {
      id: '2',
      title: '파리바게뜨 3,000원 쿠폰',
      brand: '파리바게뜨',
      expireAt: '2025-11-30',
      status: 'active',
      imageUrl: null,
      couponNumber: null,
      barcode: null,
    },
  ];

  findAll() {
    return this.coupons;
  }

  findOne(id: string) {
    return this.coupons.find((c) => c.id === id);
  }

  create(body: CreateCouponDto) {
    const newCoupon: Coupon = {
      id: String(this.coupons.length + 1),
      title: body.title,
      brand: body.brand ?? null,
      expireAt: body.expireAt ?? null,
      status: 'active',
      imageUrl: body.imageUrl ?? null,
      couponNumber: body.couponNumber ?? null,
      barcode: body.barcode ?? null,
    };
    this.coupons.push(newCoupon);
    return newCoupon;
  }

  update(id: string, body: Partial<CreateCouponDto & { status?: string }>) {
    const idx = this.coupons.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    this.coupons[idx] = {
      ...this.coupons[idx],
      ...body,
      imageUrl: body.imageUrl ?? this.coupons[idx].imageUrl,
      couponNumber: body.couponNumber ?? this.coupons[idx].couponNumber,
      barcode: body.barcode ?? this.coupons[idx].barcode,
    };

    return this.coupons[idx];
  }

  remove(id: string) {
    const before = this.coupons.length;
    this.coupons = this.coupons.filter((c) => c.id !== id);
    return this.coupons.length < before;
  }

  getExpiringSoon(days = 3) {
    const now = new Date();
    const end = new Date();
    end.setDate(now.getDate() + days);

    return this.coupons.filter((c) => {
      if (!c.expireAt) return false;
      const exp = new Date(c.expireAt);
      return exp >= now && exp <= end;
    });
  }

  changeStatus(id: string, status: 'active' | 'used' | 'expired') {
    const idx = this.coupons.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.coupons[idx].status = status;
    return this.coupons[idx];
  }
}
