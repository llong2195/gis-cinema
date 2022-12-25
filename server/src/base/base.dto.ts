import { ApiProperty } from '@nestjs/swagger';
import { MessageCode } from '@src/enum/messageCode.enum';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';

export class BaseResponseDto<T> {
  message: string;
  body: T;

  constructor(body: T | null = null, message = MessageCode.SUCCESS) {
    this.message = message;
    if (body instanceof String) {
      this.body = { ...body };
    } else {
      this.body = body;
    }
  }
}

export class AuthUserDto {
  email: string;
  id: number;
  role?: string;
}

export class PaginationResponse<T> {
  message: string;
  body: T[];
  total: number;

  constructor(body: T[] = [], total = 0, message = MessageCode.SUCCESS) {
    return { message, body, total };
  }
}

export class iPaginationOption {
  @ApiProperty({
    default: 1,
    required: false,
    description: 'Page number',
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  page: number;

  @ApiProperty({
    default: 10,
    required: false,
    description: 'Limit result number',
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @Max(1000)
  limit: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  deleted: boolean;
}
