import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TicketCreateComponent } from './tickets/ticket-create/ticket-create/ticket-create.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketCreateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
