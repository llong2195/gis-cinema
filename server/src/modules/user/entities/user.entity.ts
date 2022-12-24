import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { DateAudit } from 'src/base/date_audit.entity';
import { Role } from '@src/enum/role.enum';

@Entity({ name: 'user' })
export class UserEntity extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', unique: true, nullable: true })
  email: string;

  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Exclude()
  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'role', default: Role.USER })
  role: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Expose()
  get fullName(): string {
    if (this?.firstName && this?.lastName) return `${this?.firstName} ${this?.lastName}`;
  }
}
