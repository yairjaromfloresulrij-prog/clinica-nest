import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { PacientesService } from '../pacientes/pacientes.service.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';

@Injectable()
export class CitasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pacientesService: PacientesService,
  ) {}

  async create(data: CreateCitaDto) {
    await this.pacientesService.findOne(data.id_paciente);

    return this.prisma.citas.create({
      data: {
        id_paciente: data.id_paciente,
        id_medico: data.id_medico,
        fecha_hora: new Date(data.fecha_hora),
      },
    });
  }

  findAll() {
    return this.prisma.citas.findMany();
  }
}
