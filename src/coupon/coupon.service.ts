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
    };
    return this.coupons[idx];
  }

  remove(id: string) {
    const before = this.coupons.length;
    this.coupons = this.coupons.filter((c) => c.id !== id);
    return this.coupons.length < before;
  }

  // ✅ 오늘 ~ days일 안에 만료되는 쿠폰만 돌려주는 함수
  getExpiringSoon(days = 3) {
    const now = new Date();
    const end = new Date();
    end.setDate(now.getDate() + days);

    return this.coupons.filter((c) => {
      if (!c.expireAt) return false;
      const exp = new Date(c.expireAt);
      // 만료일이 오늘 이후이면서, end 이전이면 OK
      return exp >= now && exp <= end;
    });
  }
}
