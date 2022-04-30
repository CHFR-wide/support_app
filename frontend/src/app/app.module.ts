import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router'

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { TicketCreateComponent } from './tickets/ticket-create/ticket-create.component';
import { HeaderComponent } from './header/header.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';

const routes: Routes = [
  { path: '', component: AppComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    TicketCreateComponent,
    HeaderComponent,
    TicketListComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
