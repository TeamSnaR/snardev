import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SplitAppShellModule } from '@snardev/split-app/shell';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SplitAppShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
