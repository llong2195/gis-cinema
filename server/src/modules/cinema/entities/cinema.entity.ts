import { DateAudit } from '@base/date_audit.entity';
import { Column, Index, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Index('idx_cinema_name', ['name'], { fulltext: true })
@Index('idx_cinema_slug', ['slug'], { fulltext: true })
@Index('idx_cinema_description', ['description'], { fulltext: true })
@Index('idx_cinema_geo', ['latitude', 'longitude'])
@Entity({ name: 'cinema' })
export class CinemaEntity extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: true })
  name: string;

  @Column({ name: 'title', type: 'varchar', nullable: true })
  title: string;

  @Column({ name: 'slug', type: 'varchar', nullable: true })
  slug: string;

  @Column({ name: 'image', type: 'varchar', nullable: true })
  image: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;

  @Column({ name: 'latitude', type: 'double precision', nullable: true })
  latitude: number;

  @Column({ name: 'longitude', type: 'double precision', nullable: true })
  longitude: number;

  constructor(partial: Partial<CinemaEntity>) {
    super();
    Object.assign(this, partial);
  }
}
