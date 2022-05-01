import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketCreate } from '../ticket-create.model';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent {
  tagIndividualInput = '';
  tagArrayInput : string[] = [];

  constructor(
    public ticketsService: TicketsService,
    private router: Router,
    ) {};

  onAddTicket(form: NgForm) {
    let username = localStorage.getItem('username');
    if (username === null) username = 'none';
    const ticket: TicketCreate = {
      issue: form.value.issue,
      description: form.value.description,
      tags: form.value.tags.split(','),
      type: form.value.type,
      severity: form.value.severity,
      priority: form.value.priority,
      status: 'new',
      from: username,
    };
    this.ticketsService.addTicket(ticket).subscribe();
    this.ticketsService.sendUpdate();
  }
}
