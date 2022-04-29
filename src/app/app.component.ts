import { Component } from '@angular/core';

import {Ticket} from './tickets/ticket.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'support-app';

  storedTickets: Ticket[] = []

  onTicketAdded(ticket: Ticket) {
    this.storedTickets.push(ticket)
  }
}
