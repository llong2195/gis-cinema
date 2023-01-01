import { Command, CommandRunner } from 'nest-commander';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from '@src/modules/user/entities/user.entity';
import bcrypt from 'bcrypt';
import { Role } from '@src/enum';
import { LoggerService } from '@src/logger/custom.logger';
import { BCRYPT_SALT } from '@src/config';

@Command({ name: 'seed:user' })
export class UserCommander extends CommandRunner {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        super();
    }
    async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        try {
            await this.dataSource.transaction(async (tran) => {
                const userRepository = await tran.getRepository(UserEntity);
                const user = await userRepository.findOne({
                    where: {
                        email: 'nduylong9501@gmail.com',
                    },
                });
                if (user) {
                    user.password = '12345678';
                    user.isActive = true;
                    user.role = Role.ADMIN;
                    await user.save();
                } else {
                    await userRepository.save({
                        email: 'nduylong9501@gmail.com',
                        password: '12345678',
                        isActive: true,
                        role: Role.ADMIN,
                    });
                }
            });
        } catch (e) {
            LoggerService.error(e);
        }
    }
}
