import { Component } from '@angular/core';
import { Subscription } from 'rxjs'

import { TicketGet } from '../ticket-get.model';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent{
  tickets: TicketGet[] = []
  sub: Subscription = new Subscription;
  editing: string[] = [];

  constructor(public ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.getTickets();
    this.sub = this.ticketsService.getListUpdate().subscribe(
      () => {this.getTickets()}
    );
  }

  getTickets() {
    this.ticketsService.getTickets().subscribe(
      (found: TicketGet[]) => {this.tickets = found}
    );
  }

  editTicket(id: string){
    this.editing.push(id);
  }

  isEdited(id: string){
    return this.editing.findIndex((e) => e === id) !== -1;
  }

  endEdit(id: string){
    this.editing = this.editing.filter((e) => e!== id);
  }
}
