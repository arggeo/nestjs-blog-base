import { Expose } from 'class-transformer';
import { IsString, MaxLength, MinLength, IsOptional, Validate, IsDate } from 'class-validator';
import WordsLengthValidator from 'src/validators/words-length.validator';
import { Date, ObjectId } from 'mongoose';

export class PostDto {
   @Expose()
   _id: ObjectId;

   @Expose()
   @IsString()
   @MaxLength(50)
   @MinLength(10)
   title: string;

   @Expose()
   @IsOptional()
   @IsString()
   @Validate(WordsLengthValidator, [50, 150])
   excerpt: string;

   @Expose()
   @IsString()
   @Validate(WordsLengthValidator, [300, 2500]) // TODO: create custom decorator for this validator
   content: string;

   @Expose()
   @IsOptional()
   @IsString()
   @MaxLength(200)
   thumbnailUrl: string;

   @Expose()
   @IsDate()
   createdAt: Date;

   @Expose()
   @IsDate()
   updatedAt: Date;
}
