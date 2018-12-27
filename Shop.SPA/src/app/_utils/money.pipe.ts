import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {
  transform(value: any): any {
    const money = Number(value.toFixed(1)).toLocaleString();
    return money;
  }
}
