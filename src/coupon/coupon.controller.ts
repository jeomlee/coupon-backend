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
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  // ✅ 이걸 위로 올린다
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


  // ✅ 이미지 업로드 → /uploads/ 에 저장 → URL 돌려줌
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // 프로젝트 루트 기준
        filename: (_req, file, cb) => {
          // uniq 이름 만들어주기
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('file not found');
    }

    // 여기서 나중에 OCR 붙일 자리
    // const parsed = ocr(file.path);

    // ✅ 업로드된 파일을 접근할 수 있는 URL 만들어주기
    const imageUrl = `/uploads/${file.filename}`;

    return {
      parsed: {
        title: '이미지에서 인식된 쿠폰',
        brand: '이미지브랜드',
        expireAt: '2025-12-31',
      },
      imageUrl,
      filename: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}