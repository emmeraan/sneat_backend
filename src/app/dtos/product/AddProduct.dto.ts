import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEmail, IsNumber, IsOptional, IsString, Validate, ValidateNested } from "class-validator";
import { ProductDto } from "./Product.dto";
import { DbExistsValidation } from "src/app/utils/validations/DbExists.validation";

export class AddProductDto{
    @ApiProperty({
        description: 'vendor Id',
        example: 1,
        required: true
    })
    @IsNumber()
    @Validate(DbExistsValidation, ['vendor'])
    vendor_id: number

    @ApiProperty({
        description: 'product Details',
        required: false,
        type: [ProductDto],
      })
      @IsOptional()
      @IsArray()
      @ValidateNested({ each: true })
      @Type(() => ProductDto)
      product_data: ProductDto;

}