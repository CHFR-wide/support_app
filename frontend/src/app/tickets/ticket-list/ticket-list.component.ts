import { Component, OnDestroy, OnInit } from '@angular/core';
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
  private sub: Subscription = new Subscription;

  constructor(public ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.getTickets();
    this.sub = this.ticketsService.getListUpdate().subscribe(
      () => {this.getTickets()}
    )
  }

  getTickets() {
    this.ticketsService.getTickets().subscribe(
      (found: TicketGet[]) => {this.tickets = found}
    )
  }


}
