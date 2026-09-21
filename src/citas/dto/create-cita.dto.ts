import { IsDateString, IsInt } from 'class-validator';

export class CreateCitaDto {
  @IsInt()
  id_paciente: number;

  @IsInt()
  id_medico: number;

  @IsDateString()
  fecha_hora: string;
}
