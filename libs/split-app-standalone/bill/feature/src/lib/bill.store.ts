import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { getSelectors } from '@ngrx/router-store';
import { SplitAppService } from '@snardev/split-app-standalone/shared/data-access-api';
import { Bill } from '@snardev/split-app-standalone/shared/domain';
import { switchMap, pipe } from 'rxjs';
import { select, Store } from '@ngrx/store';

const { selectRouteParam } = getSelectors();
interface BillState {
  bill: Bill | null;
}

const DEFAULT_STATE = {
  bill: null,
};

@Injectable({ providedIn: 'any' })
export class BillStore extends ComponentStore<BillState> {
  readonly bill$ = this.select((state) => state.bill);
  readonly vm$ = this.select(this.bill$, (bill) => ({
    bill,
    hasBill: !!bill,
    hasItems: !!bill && !!bill.billItems.length,
    hasAddendums: !!bill && !!bill.addendums.length,
    showOptions: false,
  }));
  constructor(private api: SplitAppService, private store: Store) {
    super(DEFAULT_STATE);
  }

  initPage = this.effect<void>(
    pipe(
      switchMap(() => this.store.pipe(select(selectRouteParam('id')))),
      switchMap((id) => this.api.getBill(String(id))),
      tapResponse(
        (bill: Bill | null) => {
          this.patchState({ bill });
        },
        (error: HttpErrorResponse) => this.logError(error)
      )
    )
  );

  private logError(error: HttpErrorResponse) {
    console.error(error);
  }
}
