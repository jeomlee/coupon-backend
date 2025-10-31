// src/coupon/coupon.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  @Post()
  create(@Body() body: CreateCouponDto) {
    return this.couponService.create(body);
  }
}

