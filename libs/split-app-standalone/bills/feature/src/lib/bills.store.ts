import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { SplitAppService } from '@snardev/split-app-standalone/shared/data-access-api';
import { pipe, concatMap } from 'rxjs';

interface BillState {
  bills: any[];
}

const DEFAULT_STATE: BillState = {
  bills: [],
};

@Injectable({ providedIn: 'any' })
export class BillsStore extends ComponentStore<BillState> {
  bills$ = this.select((state) => state.bills);

  vm$ = this.select(this.bills$, (bills) => ({
    bills,
    hasBills: bills.length > 0,
  }));
  constructor(private readonly api: SplitAppService) {
    super(DEFAULT_STATE);
  }

  loadBills = this.effect<void>(
    pipe(
      concatMap(() => this.api.getBills()),
      tapResponse(
        (bills) => this.patchState({ bills }),
        (error: HttpErrorResponse) => this.logError(error)
      )
    )
  );

  private logError(error: HttpErrorResponse): void {
    console.error(error);
  }
}
