import { Injectable } from '@nestjs/common';
import { GenericObject } from '../interfaces/generics.interface';

@Injectable()
export class AppService {
   getNothingToSeeHere(): string {
      return 'Nothing to see here. Access "/info" to view credits.';
   }

   getInfo(): GenericObject {
      return {
         project: 'NestJS Blog Base',
         githubUrl: '',
         author: 'Argy Georgiadis',
         authorEmail: 'hello@arggeo.com',
      };
   }
}
