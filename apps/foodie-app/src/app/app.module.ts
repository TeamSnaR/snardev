import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { FoodieAppShellModule } from '@snardev/foodie-app-shell';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, FoodieAppShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
