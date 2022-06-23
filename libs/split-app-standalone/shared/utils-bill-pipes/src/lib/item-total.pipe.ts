import { Pipe, PipeTransform } from '@angular/core';
import {
  Bill,
  BillItem,
  calculateBillSubtotal,
  calculatePerItemChargeRates,
} from '@snardev/split-app-standalone/shared/domain';

@Pipe({
  name: 'itemTotal',
  pure: true,
  standalone: true,
})
export class ItemTotalPipe implements PipeTransform {
  transform(basePrice: number, quantity: number, bill: Bill): number {
    const perItemRate = calculatePerItemChargeRates(bill, bill.addendums);
    return quantity * (basePrice + basePrice * perItemRate);
  }
}
