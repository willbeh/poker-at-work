import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profile'
})
export class ProfilePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
