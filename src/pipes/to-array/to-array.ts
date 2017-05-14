import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'toArray',
})
export class ToArrayPipe implements PipeTransform {

  transform(value, args:string[]) : any {
    if (!value) {
      return value;
    } 

    let arr = [];
    for (let key in value) {
      arr.push(value[key]);
    } 
    return arr;
  } 
  
}
