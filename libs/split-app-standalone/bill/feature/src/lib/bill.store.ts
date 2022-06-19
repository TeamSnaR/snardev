import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { SplitAppService } from '@snardev/split-app-standalone/shared/data-access-api';
import { Bill } from '@snardev/split-app-standalone/shared/domain';
import { concatMap, concatMapTo, map, switchMap, tap, pipe } from 'rxjs';

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
  constructor(private api: SplitAppService) {
    super(DEFAULT_STATE);
  }

  initPage = this.effect<ActivatedRoute>(
    pipe(
      concatMap((activatedRoute) =>
        activatedRoute.paramMap.pipe(map((p) => p.get('id')))
      ),
      switchMap((id) => this.api.getBill(String(id))),
      tapResponse(
        (bill: Bill | null) => {
          console.log(bill);
          this.patchState({ bill: bill && { ...bill } });
        },
        (error: HttpErrorResponse) => this.logError(error)
      )
    )
  );

  private logError(error: HttpErrorResponse) {
    console.error(error);
  }
}
