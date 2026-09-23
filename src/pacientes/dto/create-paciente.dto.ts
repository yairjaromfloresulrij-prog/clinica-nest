import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePacienteDto {
  @ApiProperty({ example: 'Ana' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @ApiProperty({ example: 'García' })
  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  apellido: string;

  @ApiProperty({ example: '1122334455' })
  @IsString()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  telefono: string;

  @ApiProperty({ example: 'ana@mail.com', required: false })
  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email?: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser válida' })
  fecha_nacimiento: string;
}
