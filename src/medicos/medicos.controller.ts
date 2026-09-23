import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { MedicosService } from './medicos.service.js';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('Médicos')
@ApiBearerAuth()
@Controller('medicos')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('RECEPCIONISTA')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @ApiOperation({ summary: 'Lista todos los médicos' })
  @Get()
  findAll() {
    return this.medicosService.findAll();
  }

  @ApiOperation({ summary: 'Obtiene un médico por id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicosService.findOne(id);
  }

  @ApiOperation({ summary: 'Crea un nuevo médico' })
  @Post()
  create(@Body() dto: CreateMedicoDto) {
    return this.medicosService.create(dto);
  }

  @ApiOperation({ summary: 'Actualiza un médico existente' })
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMedicoDto) {
    return this.medicosService.update(id, dto);
  }

  @ApiOperation({ summary: 'Elimina un médico' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicosService.remove(id);
  }
}
