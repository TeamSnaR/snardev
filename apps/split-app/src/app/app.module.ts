import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SplitFormComponent } from './split-form.component';
import { SplitFormUiComponent } from './split-form-ui.component';

@NgModule({
  declarations: [AppComponent, SplitFormComponent, SplitFormUiComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
