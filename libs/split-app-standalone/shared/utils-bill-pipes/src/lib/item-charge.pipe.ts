import { Pipe, PipeTransform } from '@angular/core';
import {
  Bill,
  calculatePerItemChargeRates,
} from '@snardev/split-app-standalone/shared/domain';

@Pipe({
  name: 'itemCharge',
  pure: true,
  standalone: true,
})
export class ItemChargePipe implements PipeTransform {
  transform(basePrice: number, bill: Bill) {
    const perItemRate = calculatePerItemChargeRates(bill, bill.addendums);
    return basePrice * perItemRate;
  }
}
