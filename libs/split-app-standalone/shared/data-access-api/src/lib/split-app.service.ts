import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import {
  Bill,
  createBillItem,
  createFixedCharge,
  createFixedDiscount,
  createPercentCharge,
  createPercentDiscount,
} from '@snardev/split-app-standalone/shared/domain';
import { createBill } from '@snardev/split-app-standalone/shared/domain';

interface ApiResponse<T> {
  result: T;
}

//TODO: move to injection token
const DEFAULT_CURRENCY = 'GBP';
@Injectable({
  providedIn: 'root',
})
export class SplitAppService {
  constructor(private readonly httpClient: HttpClient) {}

  getBills(): Observable<Bill[]> {
    return this.httpClient
      .get<ApiResponse<Bill[]>>('./assets/mock-bills.json')
      .pipe(
        map((apiResponse: ApiResponse<Bill[]>) =>
          apiResponse.result.map((bill: Bill) => {
            const billResult = createBill(
              bill.description,
              new Date(bill.date),
              bill.currency || DEFAULT_CURRENCY,
              bill.location,
              bill.id
            );

            billResult.billItems = (bill.billItems || []).map((bi) =>
              createBillItem(
                bi.description,
                bi.currency || DEFAULT_CURRENCY,
                bi.price,
                bi.quantity,
                bi.id
              )
            );
            return billResult;
          })
        )
      );
  }

  getBill(id: string): Observable<Bill | null> {
    return this.httpClient
      .get<ApiResponse<Bill[]>>('./assets/mock-bills.json')
      .pipe(
        map((apiResponse: ApiResponse<Bill[]>) => {
          const bill = apiResponse.result.find((bill: Bill) => bill.id === id);

          if (!bill) {
            return null;
          }
          const billResult = createBill(
            bill.description,
            new Date(bill.date),
            bill.currency || DEFAULT_CURRENCY,
            bill.location,
            bill.id
          );

          billResult.billItems = (bill.billItems || []).map((bi) =>
            createBillItem(
              bi.description,
              bi.currency || DEFAULT_CURRENCY,
              bi.price,
              bi.quantity,
              bi.id
            )
          );

          billResult.addendums = (bill.addendums || []).map((add) => {
            if (add.type === 'charge') {
              if (add.amountType === 'fixed') {
                return createFixedCharge(
                  add.description,
                  add.currency,
                  add.amount,
                  add.id
                );
              } else {
                return createPercentCharge(
                  add.description,
                  add.currency,
                  add.amount,
                  add.id
                );
              }
            } else {
              if (add.amountType == 'fixed') {
                return createFixedDiscount(
                  add.description,
                  add.currency,
                  add.amount,
                  add.id
                );
              } else {
                return createPercentDiscount(
                  add.description,
                  add.currency,
                  add.amount,
                  add.id
                );
              }
            }
          });
          return billResult;
        })
      );
  }
}
