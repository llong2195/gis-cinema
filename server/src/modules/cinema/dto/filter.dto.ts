import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @ApiProperty({ example: 'name', type: String, required: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'title', type: String, required: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'description', type: String, required: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'latitude', type: Number, required: true })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 'IsNumber', type: Number, required: true })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  longitude: number;
}
