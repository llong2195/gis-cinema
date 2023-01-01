import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { BaseService } from '@base/base.service';
import { CinemaEntity } from './entities/cinema.entity';
import { CinemaRepository } from './cinema.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { LoggerService } from '@src/logger/custom.logger';
import slugify from 'slug';
import { iPaginationOption } from '@base/base.dto';
import { PAGE_SIZE } from '@config/config';
import { Point, findARound } from '@src/util/geo.util';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class CinemaService extends BaseService<CinemaEntity, CinemaRepository> {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource,
        repository: CinemaRepository,
        logger: LoggerService,
    ) {
        super(repository, logger);
    }
    async create(createCinemaDto: CreateCinemaDto): Promise<CinemaEntity> {
        const createCinema = new CinemaEntity(createCinemaDto);
        createCinema.slug = slugify(createCinemaDto.name);
        return await this._store(createCinema);
    }

    async index(): Promise<CinemaEntity[]> {
        return await this.repository.find({
            where: {
                deleted: false,
            },
        });
    }

    async findAll(filter: FilterDto, pagination: iPaginationOption): Promise<CinemaEntity[]> {
        const limit = pagination?.limit ? pagination.limit : PAGE_SIZE;
        const page = pagination?.page ? pagination.page : 0;
        const skip = limit * page;
        const deleted = pagination?.deleted ? pagination.deleted : false;
        return await this.repository.find({ where: { deleted: deleted }, skip: skip, take: limit });
    }

    async count(filter: FilterDto, pagination: iPaginationOption): Promise<number> {
        const limit = pagination?.limit ? pagination.limit : PAGE_SIZE;
        const page = pagination?.page ? pagination.page : 0;
        const skip = limit * page;
        const deleted = pagination?.deleted ? pagination.deleted : false;
        return await this.repository.count({ where: { deleted: deleted } });
    }

    async findOne(id: number): Promise<CinemaEntity> {
        return await this.repository.findOneBy({ id });
    }

    async update(id: number, updateCinemaDto: UpdateCinemaDto): Promise<CinemaEntity> {
        const updateCinema = new CinemaEntity(updateCinemaDto);
        if (updateCinema.name) {
            updateCinema.slug = slugify(updateCinema.name);
        }
        return await this._update(id, updateCinema);
    }

    async remove(id: number): Promise<CinemaEntity> {
        return await this._destroy(id);
    }

    async findAROund(filters: FilterDto, distance = 0): Promise<CinemaEntity[]> {
        if (distance < 1000) distance = 1000;

        const points = findARound(new Point({ latitude: filters.latitude, longitude: filters.longitude }), distance);
        const query = this.repository.createQueryBuilder();
        query
            .andWhere('latitude >= :latitude1', {
                latitude1: points.start.latitude,
            })
            .andWhere('latitude <= :latitude2', {
                latitude2: points.end.latitude,
            })
            .andWhere('longitude >= :longitude1', {
                longitude1: points.start.longitude,
            })
            .andWhere('longitude <= :longitude2', {
                longitude2: points.end.longitude,
            });
        return query.getMany();
    }
}