import { IsNumber } from 'class-validator';

export class DeleteDepartmentDto {
  @IsNumber()
  id: number;
}
