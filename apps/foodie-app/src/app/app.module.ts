import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TempShellModule } from '@snardev/temp-shell';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TempShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
