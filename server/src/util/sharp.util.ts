import { UPLOAD_LOCATION } from '@config/config';
import sharp from 'sharp';

export const resize = async (file, width = 320, height = 240) => {
  return await sharp(file.path)
    .resize({
      width: width,
      height: height,
    })
    .toFile(UPLOAD_LOCATION + `/${width}x${height}-` + file.filename);
};
