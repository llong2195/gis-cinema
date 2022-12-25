import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '@config/multer.config';
import { AuthUserDto, BaseResponseDto, iPaginationOption } from '@base/base.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/decorators/auth.user.decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateFileDto } from './dto/create-file.dto';
import { FileEntity } from '@src/modules/file/entities/file.entity';
import { Roles } from '@src/decorators/role.decorators';
import { Role } from '@src/enum';
import { PaginationResponse } from '../../base/base.dto';
import { count } from 'console';

@ApiTags('/v1/file')
@Controller('v1/file')
export class FileController {
  constructor(private readonly uploadFileService: FileService) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'file image',
    type: CreateFileDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/upload-local')
  async local(@UploadedFile() file: Express.Multer.File, @AuthUser() authUser?: AuthUserDto) {
    const uploadfile = await this.uploadFileService.uploadFile(authUser?.id, file);
    return new BaseResponseDto<FileEntity>(plainToClass(FileEntity, uploadfile));
  }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'file image',
    type: CreateFileDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/upload-cloud')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async cloud(
    @UploadedFile() file: Express.Multer.File,
    @AuthUser() authUser?: AuthUserDto,
  ): Promise<BaseResponseDto<FileEntity>> {
    try {
      const data = await this.uploadFileService.uploadImageToCloudinary(file, authUser?.id);
      return new BaseResponseDto<FileEntity>(plainToInstance(FileEntity, data));
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Get('/get-all')
  async getAll(@Query() pagination: iPaginationOption): Promise<PaginationResponse<FileEntity>> {
    const page: number = pagination.page ? pagination.page : 1;
    const limit: number = pagination.limit ? pagination.limit : 10;
    const deleted: boolean = pagination.deleted ? pagination.deleted : false;
    const data = await this.uploadFileService._findByDeleted(deleted, true, page);
    const total = await this.uploadFileService._countByDeleted(deleted);
    return new PaginationResponse<FileEntity>(plainToInstance(FileEntity, data), total);
  }
}
