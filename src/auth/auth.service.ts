import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service.js';
import { Role } from '../generated/prisma/client.js';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  async register(data: {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    role: Role;
    id_especialidad?: number;
  }) {
    if (data.role === 'MEDICO' && !data.id_especialidad) {
      throw new BadRequestException(
        'id_especialidad es obligatorio cuando el rol es MEDICO',
      );
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.usuarios.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        id_especialidad:
          data.role === 'MEDICO' ? data.id_especialidad : undefined,
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        role: true,
        id_especialidad: true,
      },
    });
  }
  async login(email: string, password: string) {
    const usuario = await this.prisma.usuarios.findUnique({ where: { email } });
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      this.configService.get<string>('JWT_SECRET') as string,
      { expiresIn: '8h' },
    );
    return { token };
  }
}
