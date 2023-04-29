import { SortBy, Sorting } from 'src/types/sorting.types';

export interface QueryDto {
   page: number;

   size: number;

   sort: Sorting;

   sortBy: SortBy;
}
