import { Pipe, PipeTransform } from '@angular/core';
import { Prd } from './shared/interfaces/prd';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Prd[],term:string): Prd[] {
    return products.filter((product)=>product.title.toLowerCase().includes(term.toLowerCase()));
  }

}
