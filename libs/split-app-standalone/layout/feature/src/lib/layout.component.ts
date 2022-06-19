/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageComponent } from './page.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, tap } from 'rxjs/operators';
import { LayoutStore } from './layout.store';

@Component({
  selector: 'snardev-sas-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './layout.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  pageHeading$ = this.store.pageHeading$;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly store: LayoutStore, private router: Router) {
    this.store.initPage();
  }
}
