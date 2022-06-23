import { Pipe, PipeTransform } from '@angular/core';
import {
  Addendum,
  Bill,
  calculateBillGrandTotal,
} from '@snardev/split-app-standalone/shared/domain';

@Pipe({
  name: 'billGrandTotal',
  pure: true,
  standalone: true,
})
export class BillGrandTotalPipe implements PipeTransform {
  transform(bill: Bill, addendums: Addendum[]): number {
    return calculateBillGrandTotal(bill, addendums);
  }
}
