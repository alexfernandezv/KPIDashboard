import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InitialComponent } from './initial.component';


@NgModule({
  declarations: [
    InitialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, ],
  providers: [],
  bootstrap: [InitialComponent]
})
export class InitialModule { }


