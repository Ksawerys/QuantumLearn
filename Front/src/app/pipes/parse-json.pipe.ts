import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseJson',
  standalone: true
})
export class ParseJsonPipe implements PipeTransform {
  transform(value: string): any {
    try {
      console.log('parseJson',value);
      const parsedValue = JSON.parse(value);
      console.log('parseJson',parsedValue.data);
      return parsedValue.data;
    } catch (e) {
      return null;
    }
  }
}
