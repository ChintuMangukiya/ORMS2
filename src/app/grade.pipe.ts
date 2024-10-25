import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grade'
})
export class GradePipe implements PipeTransform {

  transform(marks: number): string {
    if(marks>=90) return 'AA';
    if(marks>=80) return 'AB';
    if(marks>=70) return 'BB';
    if(marks>=60) return 'BC';
    if(marks>=50) return 'CD';
    if(marks>=40) return 'DD';
    if(marks>=33) return 'EE';

    return 'FF';
   
  }

}
