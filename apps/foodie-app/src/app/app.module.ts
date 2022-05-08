import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FoodieAppShellModule } from '@snardev/foodie-app/shell';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FoodieAppShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
