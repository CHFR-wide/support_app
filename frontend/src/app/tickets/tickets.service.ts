import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


import { Ticket } from './ticket.model'

@Injectable({providedIn: 'root'})
export class TicketsService {
  private tickets: Ticket[] = [];
  private ticketsUpdated = new Subject<Ticket[]>();

  // getTickets() {
  //   return [...this.tickets]; // Array deepcopy
  // }

  getTicketListener() {
    return this.ticketsUpdated.asObservable();
  }

  addTicket(ticket: Ticket) {
    this.tickets.push(ticket)
    this.ticketsUpdated.next([...this.tickets])
  }
}
