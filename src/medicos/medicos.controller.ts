import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { MedicosService } from './medicos.service.js';

@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Get()
  findAll() {
    return this.medicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicosService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: {
      nombre: string;
      apellido: string;
      email: string;
      password: string;
      id_especialidad: number;
    },
  ) {
    return this.medicosService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      nombre?: string;
      apellido?: string;
      email?: string;
      id_especialidad?: number;
    },
  ) {
    return this.medicosService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicosService.remove(id);
  }
}
