import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  apellido: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  telefono: string;

  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email?: string;

  @IsDateString({}, { message: 'La fecha de nacimiento debe ser válida' })
  fecha_nacimiento: string;
}
