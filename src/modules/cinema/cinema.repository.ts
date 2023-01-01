import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CinemaEntity } from './entities/cinema.entity';

@Injectable()
export class CinemaRepository extends Repository<CinemaEntity> {
    private repository: Repository<CinemaEntity>;
    constructor(private dataSource: DataSource) {
        super(CinemaEntity, dataSource.createEntityManager());
        this.repository = dataSource.getRepository(CinemaEntity);
    }
}
