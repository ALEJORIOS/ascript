import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class DatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    moment.locale('es');
    return moment(String(value)).format('LLLL');
  }

}
