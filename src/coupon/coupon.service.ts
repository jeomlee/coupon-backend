import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Injectable()
export class CouponService {
  private coupons = [
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

  // 전체 쿠폰 목록
  findAll() {
    return this.coupons;
  }

  // 특정 쿠폰 찾기
  findOne(id: string) {
    return this.coupons.find((c) => c.id === id);
  }

  // 쿠폰 생성
  create(body: CreateCouponDto) {
    const newCoupon = {
      id: (this.coupons.length + 1).toString(),
      title: body.title ?? '제목 없음',
      brand: body.brand ?? '',
      expireAt: body.expireAt ?? '',
      status: 'active',
    };
    this.coupons.push(newCoupon);
    return newCoupon;
  }

  // 쿠폰 수정
  update(id: string, body: Partial<CreateCouponDto & { status?: string }>) {
    const index = this.coupons.findIndex((c) => c.id === id);
    if (index === -1) return null;
    this.coupons[index] = { ...this.coupons[index], ...body };
    return this.coupons[index];
  }

  // 쿠폰 삭제
  remove(id: string) {
    const index = this.coupons.findIndex((c) => c.id === id);
    if (index === -1) return false;
    this.coupons.splice(index, 1);
    return true;
  }
}
