import { Module } from '@nestjs/common';
import { PacientesModule } from '../pacientes/pacientes.module.js';
import { CitasService } from './citas.service.js';
import { CitasController } from './citas.controller.js';

@Module({
  imports: [PacientesModule],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}
