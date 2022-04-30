import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

import {Ticket} from './tickets/ticket.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  title = 'support-app';

  storedTickets: Ticket[] = []

  onTicketAdded(ticket: Ticket) {
    this.storedTickets.push(ticket)
  }
}
