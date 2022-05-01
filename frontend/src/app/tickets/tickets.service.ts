import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TicketCreate } from './ticket-create.model';
import { TicketGet } from './ticket-get.model';

@Injectable({providedIn: 'root'})
export class TicketsService {
  private tickets: TicketGet[] = [];
  private ticketsUrl = environment.apiUrl + "tickets";
  private ticketsUpdated = new Subject<number>();

  constructor(private http: HttpClient) { }

  // getTickets() {
  //   return [...this.tickets]; // Array deepcopy
  // }

  getTickets() {
    return this.http.get<TicketGet[]>(this.ticketsUrl);
  }

  addTicket(ticket: TicketCreate) {
    return this.http.post(this.ticketsUrl, ticket);
  }

  getTicketListener() {
    return this.ticketsUpdated.asObservable();
  }

  // addTicket(ticket: Ticket) {
  //   this.tickets.push(ticket)
  //   this.ticketsUpdated.next([...this.tickets])
  // }
}
