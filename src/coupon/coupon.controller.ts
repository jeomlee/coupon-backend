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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('file not found');
    }
    return {
      parsed: {
        title: '이미지에서 인식된 쿠폰',
        brand: '이미지브랜드',
        expireAt: '2025-12-31',
      },
    };
  }
}
