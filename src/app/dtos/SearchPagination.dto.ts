import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from './Pagination.dto';

export class SearchPaginationDto extends PaginationDto {
  @ApiProperty({
    name: 'search',
    description: 'enter data you want to search',
    example: 'xyz',
    required: false,
  })
  search: string;
}
