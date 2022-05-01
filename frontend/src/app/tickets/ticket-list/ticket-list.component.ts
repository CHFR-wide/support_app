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
  // tickets: Ticket[] = [{
  //     issue: "Questions sur les tickets",
  //     description: "Comment ça fonctionne? Je suis intrigué",
  //     tags: ['tickets', 'angular', 'aide'],
  //     type: "Question",
  //     severity: "Normale",
  //     priority: "Normale",
  //     status: "New",
  //     from: "chfr",
  //     created: "29/04/2022",
  // }]
  tickets: TicketGet[] = []
  private sub: Subscription = new Subscription;

  constructor(public ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.getTickets();
    // this.sub = this.ticketsService.getTicketListener()
    //   .subscribe((tickets) => { this.tickets = tickets });
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe()
  // }

  getTickets() {
    this.ticketsService.getTickets().subscribe(
      (found: TicketGet[]) => {this.tickets = found}
    )
  }


}
