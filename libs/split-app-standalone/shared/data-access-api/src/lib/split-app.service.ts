import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SplitAppService {
  constructor(private readonly httpClient: HttpClient) {}

  getBills(): Observable<any[]> {
    return this.httpClient
      .get<any>('./assets/mock-data.json')
      .pipe(map((result: any) => result.bills));
  }
}
