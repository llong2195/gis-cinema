import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCinemaDto {
    @ApiProperty({ example: 'name', type: String, required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'title', type: String, required: true })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'description', type: String, required: true })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 'image', type: String, required: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({ example: 'latitude', type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @ApiProperty({ example: 'longitude', type: Number, required: true })
    @IsNotEmpty()
    @IsNumber()
    longitude: number;
}
