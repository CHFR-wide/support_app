import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TicketCreate } from './ticket-create.model';
import { TicketGet } from './ticket-get.model';

@Injectable({providedIn: 'root'})
export class TicketsService {
  private ticketsUrl = environment.apiUrl + "tickets";
  private subject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getTickets() {
    return this.http.get<TicketGet[]>(this.ticketsUrl);
  }

  addTicket(ticket: TicketCreate) {
    return this.http.post(this.ticketsUrl, ticket);
  }

  editTicket(ticket: TicketCreate, id: string) {
    const url: string = this.ticketsUrl + '/' + id
    return this.http.put(url, ticket);
  }

  sendListUpdate(){
    this.subject.next();
  }

  getListUpdate(){
    return this.subject.asObservable();
  }
}
