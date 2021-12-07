import {Pipe, PipeTransform} from '@angular/core';
import {format} from 'date-fns';

@Pipe({
  name: 'dayjs',
  pure: false
})
export class DayjsPipe implements PipeTransform {

  transform(date: Date, dateFormat: string = 'MMMM YYYY'): string {
    return format(date, dateFormat);
  }
}
