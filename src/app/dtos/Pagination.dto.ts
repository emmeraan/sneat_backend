import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'records per page',
    example: 4,
    required: true,
  })
  @IsOptional()
  limit: number;

  @ApiProperty({
    description: 'page Number',
    example: 1,
    required: true,
  })
  @IsOptional()
  page: number;
}
