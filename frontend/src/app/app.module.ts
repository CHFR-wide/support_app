import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TicketEditComponent } from './tickets/ticket-edit/ticket-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

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
    LogoutComponent,
    TicketEditComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
