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
import { PacientesService } from './pacientes.service.js';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('Pacientes')
@ApiBearerAuth()
@Controller('pacientes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('RECEPCIONISTA')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @ApiOperation({ summary: 'Lista todos los pacientes' })
  @Get()
  findAll() {
    return this.pacientesService.findAll();
  }

  @ApiOperation({ summary: 'Obtiene un paciente por id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pacientesService.findOne(id);
  }

  @ApiOperation({ summary: 'Crea un nuevo paciente' })
  @Post()
  create(@Body() dto: CreatePacienteDto) {
    return this.pacientesService.create(dto);
  }

  @ApiOperation({ summary: 'Actualiza un paciente existente' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePacienteDto,
  ) {
    return this.pacientesService.update(id, dto);
  }

  @ApiOperation({ summary: 'Elimina un paciente' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pacientesService.remove(id);
  }
}
