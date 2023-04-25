import {
   IsString,
   MaxLength,
   MinLength,
   IsOptional,
   Validate,
} from 'class-validator';
import { WordsLengthValidator } from 'src/validators/words-length.validator';

export class CreatePostDto {
   @IsString()
   @MaxLength(50)
   @MinLength(10)
   title: string;

   @IsString()
   @IsOptional()
   @MaxLength(150)
   @MinLength(50)
   excerpt: string;

   @IsString()
   @Validate(WordsLengthValidator, [300, 2500])
   content: string;
}
