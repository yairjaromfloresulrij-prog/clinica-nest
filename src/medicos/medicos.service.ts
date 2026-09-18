import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcryptjs';

const medicoSelect = {
  id: true,
  nombre: true,
  apellido: true,
  email: true,
  role: true,
  id_especialidad: true,
  especialidad: true,
};

@Injectable()
export class MedicosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.usuarios.findMany({
      where: { role: 'MEDICO' },
      select: medicoSelect,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const medico = await this.prisma.usuarios.findFirst({
      where: { id, role: 'MEDICO' },
      select: medicoSelect,
    });

    if (!medico) {
      throw new NotFoundException(`Médico de ID: ${id} no encontrado`);
    }

    return medico;
  }

  async create(data: {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    id_especialidad: number;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.usuarios.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        password: hashedPassword,
        role: 'MEDICO',
        id_especialidad: data.id_especialidad,
      },
      select: medicoSelect,
    });
  }

  async update(
    id: number,
    data: {
      nombre?: string;
      apellido?: string;
      email?: string;
      id_especialidad?: number;
    },
  ) {
    await this.findOne(id);

    return this.prisma.usuarios.update({
      where: { id },
      data,
      select: medicoSelect,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.usuarios.delete({
      where: { id },
    });
  }
}
