import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ticket } from '../ticket.model';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent {
  tagIndividualInput = '';
  tagArrayInput : string[] = [];

  onAddTicket(form: NgForm) {
    if(form.invalid) return;
    const ticket: Ticket = {
      issue: form.value.issue,
      description: form.value.description,
      tags: form.value.tags.split(','),
      type: form.value.type,
      severity: form.value.severity,
      priority: form.value.priority,
      status: form.value.status,
      from: form.value.from,
      created: Date.now(),
    };
    this.ticketsService.addTicket(ticket);
    form.resetForm();
  }

  constructor(public ticketsService: TicketsService) {};
}
