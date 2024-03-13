import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'records per page',
    example: 4,
    required: false,
  })
  @IsOptional()
  limit: number;

  @ApiProperty({
    description: 'page Number',
    example: 1,
    required: false,
  })
  @IsOptional()
  page: number;
}
