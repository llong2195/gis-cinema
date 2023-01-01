import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { DateAudit } from 'src/base/date_audit.entity';
import { Role } from '@src/enum/role.enum';

@Index('idx_user_email', ['email'])
@Entity({ name: 'user' })
export class UserEntity extends DateAudit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'email', unique: true, type: 'varchar', nullable: true })
    email: string;

    @Column({ name: 'avatar', type: 'varchar', nullable: true })
    avatar: string;

    @Column({ name: 'first_name', type: 'varchar', nullable: true })
    firstName: string;

    @Column({ name: 'last_name', type: 'varchar', nullable: true })
    lastName: string;

    @Exclude()
    @Column({ name: 'password', type: 'varchar' })
    password: string;

    @Column({ name: 'role', type: 'varchar', default: Role.USER })
    role: string;

    @Column({ name: 'is_active', type: 'boolean', default: true })
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
