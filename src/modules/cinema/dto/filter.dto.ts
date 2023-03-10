import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterDto {
    @ApiProperty({ example: 'name', type: String, required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'title', type: String, required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'description', type: String, required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: '21.01282545757188', type: Number, required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    latitude: number;

    @ApiProperty({ example: '105.84975093015775', type: Number, required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    longitude: number;

    @ApiProperty({ example: 'distance: 900000', type: Number, required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    distance: number;
}
