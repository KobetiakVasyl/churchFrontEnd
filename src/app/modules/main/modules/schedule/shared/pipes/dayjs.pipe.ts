import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from "dayjs";

@Pipe({
  name: 'dayjs',
  pure: false
})
export class DayjsPipe implements PipeTransform {

  transform(date: dayjs.Dayjs, format: string = 'MMMM YYYY'): string {
    return dayjs(date).locale('uk').format(format);
  }
}
