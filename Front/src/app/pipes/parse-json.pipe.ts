import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseJson',
  standalone: true
})
export class ParseJsonPipe implements PipeTransform {
  transform(value: string): any {
    try {
      const parsedValue = JSON.parse(value);
      return parsedValue.data;
    } catch (e) {
      return null;
    }
  }
}
