import { Pipe, PipeTransform } from '@angular/core';
import {
  BillItem,
  calculateBillSubtotal,
} from '@snardev/split-app-standalone/shared/domain';

@Pipe({
  name: 'billSubtotal',
  pure: true,
  standalone: true,
})
export class BillSubtotalPipe implements PipeTransform {
  transform(billItems: BillItem[]): number {
    return calculateBillSubtotal(billItems);
  }
}
