import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent {
  tickets = [{
      issue: "Questions sur les tickets",
      description: "Comment ça fonctionne? Je suis intrigué",
      tags: ['tickets', 'angular', 'aide'],
      type: "Question",
      severity: "Normale",
      priority: "Normale",
      status: "New",
      from: "chfr",
      created: "29/04/2022",
  }]
  // tickets: {
  //   issue: string;
  //   description: string;
  //   tags: Array<string>;
  //   type: string;
  //   severity: string;
  //   priority: string;
  //   status: string;
  //   from: string;
  //   created: string;
  // }[] = []
}
