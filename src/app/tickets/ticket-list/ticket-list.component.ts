import { Component, Input } from '@angular/core';

import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent {
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
  @Input() tickets: Ticket[] = []
}
