import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '@src/decorators/role.decorators';
import { Role } from '@src/enum';
import { AuthUser } from '@src/decorators/auth.user.decorator';
import { AuthUserDto, BaseResponseDto, iPaginationOption } from '@base/base.dto';
import { CinemaEntity } from './entities/cinema.entity';
import { PaginationResponse } from '../../base/base.dto';
import { plainToInstance } from 'class-transformer';
import { FilterDto } from './dto/filter.dto';

@ApiTags('v1/cinema')
@Controller('v1/cinema')
export class CinemaController {
    constructor(private readonly cinemaService: CinemaService) {}

    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN)
    @Post()
    async create(
        @AuthUser() authUserDto: AuthUserDto,
        @Body() createCinemaDto: CreateCinemaDto,
    ): Promise<BaseResponseDto<CinemaEntity>> {
        const data = await this.cinemaService.create(createCinemaDto);
        return new BaseResponseDto<CinemaEntity>(plainToInstance(CinemaEntity, data));
    }

    @Get()
    async index(): Promise<BaseResponseDto<CinemaEntity[]>> {
        const data = await this.cinemaService.index();
        return new BaseResponseDto<CinemaEntity[]>(plainToInstance(CinemaEntity, data));
    }

    @Get('/search')
    async findAll(
        @Query() filter: FilterDto,
        @Query('distance') distance: number,
    ): Promise<BaseResponseDto<CinemaEntity[]>> {
        const data = await this.cinemaService.findAll(filter, distance);
        return new BaseResponseDto<CinemaEntity[]>(plainToInstance(CinemaEntity, data));
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<BaseResponseDto<CinemaEntity>> {
        const data = await this.cinemaService.findOne(+id);
        return new BaseResponseDto<CinemaEntity>(plainToInstance(CinemaEntity, data));
    }

    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN)
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() updateCinemaDto: UpdateCinemaDto,
    ): Promise<BaseResponseDto<CinemaEntity>> {
        const data = await this.cinemaService.update(+id, updateCinemaDto);
        return new BaseResponseDto<CinemaEntity>(plainToInstance(CinemaEntity, data));
    }

    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<BaseResponseDto<CinemaEntity>> {
        const data = await this.cinemaService.remove(+id);
        return new BaseResponseDto<CinemaEntity>(plainToInstance(CinemaEntity, data));
    }

    @Get('/find-a-round')
    async findARound(
        @Query() filters: FilterDto,
        @Query('distance') distance: number,
    ): Promise<BaseResponseDto<CinemaEntity[]>> {
        const data = await this.cinemaService.findAROund(filters, distance);
        return new BaseResponseDto<CinemaEntity[]>(plainToInstance(CinemaEntity, data));
    }
}
