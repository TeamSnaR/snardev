import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Bill } from '@snardev/split-app-standalone/shared/domain';
import { createBill } from '@snardev/split-app-standalone/shared/domain';

interface ApiResponse<T> {
  result: T[];
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
      .get<ApiResponse<Bill>>('./assets/mock-bills.json')
      .pipe(
        map((apiResponse: ApiResponse<Bill>) =>
          apiResponse.result.map((bill: Bill) =>
            createBill(
              bill.description,
              new Date(bill.date),
              bill.currency || DEFAULT_CURRENCY,
              bill.location
            )
          )
        )
      );
  }
}
