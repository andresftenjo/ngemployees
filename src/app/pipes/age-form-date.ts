import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ageFromDate'})
export class AgeFormDate implements PipeTransform {
  transform(value: Date): string {
    let timeDiff = Math.abs(Date.now() - new Date(value).getTime());
    let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    return age.toString();
  }
}
