import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CitasService } from './citas.service.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('Citas')
@ApiBearerAuth()
@Controller('citas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @ApiOperation({ summary: 'Crea una nueva cita' })
  @Roles('RECEPCIONISTA')
  @Post()
  create(@Body() createCitaDto: CreateCitaDto) {
    return this.citasService.create(createCitaDto);
  }

  @ApiOperation({
    summary:
      'Lista las citas (todas para recepción/gerencia, propias para médico)',
  })
  @Roles('RECEPCIONISTA', 'MEDICO', 'GERENCIA')
  @Get()
  findAll(@Req() req: any) {
    return this.citasService.findAll(req.user);
  }
}
