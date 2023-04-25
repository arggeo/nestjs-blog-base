import { Min, IsOptional, Validate, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortingValidator } from 'src/validators/sorting.validator';

type Sorting = 1 | -1;

export class PaginationQueryDto {
   @IsOptional()
   @IsInt()
   @Transform(({ value }) => parseInt(value))
   @Min(1)
   page: number;

   @IsOptional()
   @IsInt()
   @Transform(({ value }) => parseInt(value))
   @Min(10)
   size: number;

   @IsOptional()
   @IsInt()
   @Transform(({ value }) => parseInt(value))
   @Validate(SortingValidator, [-1, 1])
   sort: Sorting;
}
