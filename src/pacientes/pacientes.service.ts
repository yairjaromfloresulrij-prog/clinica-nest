import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import { CreatePacienteDto } from './dto/create-paciente.dto.js';

import { UpdatePacienteDto } from './dto/update-paciente.dto.js';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.pacientes.findMany();
  }

  async findOne(id: number) {
    const paciente = await this.prisma.pacientes.findUnique({
      where: { id_paciente: id },
    });

    if (!paciente) {
      throw new NotFoundException(`Paciente de ID: ${id} no encontrado`);
    }

    return paciente;
  }

  async create(data: CreatePacienteDto) {
    const fechaNacimiento = new Date(data.fecha_nacimiento);

    if (fechaNacimiento > new Date()) {
      throw new BadRequestException(
        'La fecha de nacimiento no puede ser futura',
      );
    }

    return this.prisma.pacientes.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        telefono: data.telefono,
        email: data.email,
        fecha_nacimiento: fechaNacimiento,
      },
    });
  }

  async update(id: number, data: UpdatePacienteDto) {
    await this.findOne(id);

    let fechaNacimiento: Date | undefined;

    if (data.fecha_nacimiento) {
      fechaNacimiento = new Date(data.fecha_nacimiento);

      if (fechaNacimiento > new Date()) {
        throw new BadRequestException(
          'La fecha de nacimiento no puede ser futura',
        );
      }
    }

    return this.prisma.pacientes.update({
      where: { id_paciente: id },
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        telefono: data.telefono,
        email: data.email,
        fecha_nacimiento: fechaNacimiento,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.pacientes.delete({
      where: { id_paciente: id },
    });
  }
}
