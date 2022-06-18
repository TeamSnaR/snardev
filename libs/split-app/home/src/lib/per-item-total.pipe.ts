import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Addendum, Bill, BillItem } from '@snardev/split-app/domain';
import {
  getBillGrandTotal,
  getBillSubtotal,
  getPerItemRate,
} from '@snardev/split-app/shared/utils/common';

@Pipe({
  name: 'perItemTotal',
  pure: true,
})
export class PerItemTotalPipe implements PipeTransform {
  transform(basePrice: number, quantity: number, bill: Bill): number {
    const perItemRate = getPerItemRate(bill, bill.addendums);
    return quantity * (basePrice + basePrice * perItemRate);
  }
}

@Pipe({
  name: 'perItemCharge',
  pure: true,
})
export class PerItemChargePipe implements PipeTransform {
  transform(basePrice: number, bill: Bill) {
    const perItemRate = getPerItemRate(bill, bill.addendums);
    return basePrice * perItemRate;
  }
}

@Pipe({
  name: 'billSubtotal',
  pure: true,
})
export class BillSubtotalPipe implements PipeTransform {
  transform(billItems: BillItem[]): number {
    return getBillSubtotal(billItems);
  }
}

@Pipe({
  name: 'billGrandTotal',
  pure: true,
})
export class BillGrandTotalPipe implements PipeTransform {
  transform(bill: Bill, addendums: Addendum[]): number {
    return getBillGrandTotal(bill, addendums);
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    PerItemChargePipe,
    PerItemTotalPipe,
    BillSubtotalPipe,
    BillGrandTotalPipe,
  ],
  exports: [
    PerItemChargePipe,
    PerItemTotalPipe,
    BillSubtotalPipe,
    BillGrandTotalPipe,
  ],
})
export class SplitAppPipesModule {}
