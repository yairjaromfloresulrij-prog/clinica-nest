import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

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

  create(data: {
    nombre: string;
    apellido: string;
    telefono: string;
    email?: string;
    fecha_nacimiento: Date;
  }) {
    return this.prisma.pacientes.create({ data });
  }

  async update(
    id: number,
    data: {
      nombre?: string;
      apellido?: string;
      telefono?: string;
      email?: string;
      fecha_nacimiento?: Date;
    },
  ) {
    await this.findOne(id);

    return this.prisma.pacientes.update({
      where: { id_paciente: id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.pacientes.delete({
      where: { id_paciente: id },
    });
  }
}
