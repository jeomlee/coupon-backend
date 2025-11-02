// src/coupon/coupon.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  // ✅ 임박 쿠폰
  // GET /coupons/soon
  // GET /coupons/soon?days=7
  @Get('soon')
  getSoon(@Query('days') days?: string) {
    const d = days ? Number(days) : 3;
    return this.couponService.getExpiringSoon(d);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const coupon = this.couponService.findOne(id);
    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }
    return coupon;
  }

  @Post()
  create(@Body() body: CreateCouponDto) {
    return this.couponService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const updated = this.couponService.update(id, body);
    if (!updated) {
      throw new NotFoundException('Coupon not found');
    }
    return updated;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const ok = this.couponService.remove(id);
    if (!ok) {
      throw new NotFoundException('Coupon not found');
    }
    return { success: true };
  }

  // 👇 이미지 업로드
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('file not found');
    }

    // 여기서 나중에 OCR 붙이면 됨
    return {
      parsed: {
        title: '이미지에서 인식된 쿠폰',
        brand: '이미지브랜드',
        expireAt: '2025-12-31',
      },
      // 디버깅용
      filename: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
