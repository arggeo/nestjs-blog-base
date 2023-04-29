import { Min, IsOptional, Validate, IsInt, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortByValidator, SortingValidator } from 'src/validators/sorting.validators';
import { QueryDto } from 'src/interfaces/QueryDto.interface';
import { SortBy, Sorting } from 'src/types/sorting.types';

export class PostsQueryDto implements QueryDto {
   @IsOptional()
   @IsInt()
   @Transform(({ value }) => parseInt(value))
   @Min(1)
   page: number;

   @IsOptional()
   @IsInt()
   @Min(10)
   @Transform(({ value }) => parseInt(value))
   size: number;

   @IsOptional()
   @IsInt()
   @Validate(SortingValidator, [-1, 1])
   @Transform(({ value }) => parseInt(value))
   sort: Sorting;

   @IsOptional()
   @IsString()
   @Validate(SortByValidator, ['title', 'createdAt', 'updatedAt'])
   sortBy: SortBy;
}
