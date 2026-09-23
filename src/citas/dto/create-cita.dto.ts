import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';

export class CreateCitaDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id_paciente: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  id_medico: number;

  @ApiProperty({ example: '2026-09-30T14:00:00.000Z' })
  @IsDateString()
  fecha_hora: string;
}
