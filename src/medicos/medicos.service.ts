import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MedicosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.usuarios.findMany({
      where: { role: 'MEDICO' },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        role: true,
        id_especialidad: true,
        especialidad: true,
      },
      orderBy: { id: 'asc' },
    });
  }
}
