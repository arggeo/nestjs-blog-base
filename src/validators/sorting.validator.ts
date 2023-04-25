import {
   ValidatorConstraint,
   ValidatorConstraintInterface,
   ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'sorting', async: false })
export class SortingValidator implements ValidatorConstraintInterface {
   validate(sorting: number, args: ValidationArguments) {
      return args.constraints.includes(sorting);
   }

   defaultMessage(validationArguments?: ValidationArguments): string {
      return `Sort must be between ${validationArguments.constraints.toString()}`;
   }
}
