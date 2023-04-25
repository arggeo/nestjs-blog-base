import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GenericObject } from '../interfaces/generics.interface';

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}

   @Get()
   getNothingToSeeHere(): string {
      return this.appService.getNothingToSeeHere();
   }

   @Get('info')
   getInfo(): GenericObject {
      return this.appService.getInfo();
   }
}
