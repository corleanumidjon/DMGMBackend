import {
  Controller,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  Get,
  Post,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FilesInterceptor('image', 10, { storage }))
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createCarDto: CreateCarDto,
  ) {
    const images = files.map((file) => '/' + file.originalname);

    createCarDto['images'] = images;
    return this.carsService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
