import {
   ValidatorConstraint,
   ValidatorConstraintInterface,
   ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'wordsLengthValidator', async: false })
export class WordsLengthValidator implements ValidatorConstraintInterface {
   validate(text: string, args: ValidationArguments) {
      const words = text.split(' ');
      const minConstraint = args.constraints[0] || 300;
      const maxConstraint = args.constraints[1] || 2500;

      return words.length >= minConstraint && words.length <= maxConstraint;
   }

   defaultMessage(validationArguments?: ValidationArguments): string {
      return `Word count must be between ${validationArguments.constraints.toString()}`;
   }
}
