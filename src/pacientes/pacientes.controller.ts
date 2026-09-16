import { Controller, Get } from '@nestjs/common';
import { PacientesService } from '../pacientes/pacientes.service.js';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Get()
  findAll() {
    return this.pacientesService.findAll();
  }
}
