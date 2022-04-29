import { Component, EventEmitter, Output } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent {
  issueInput = '';
  descriptionInput = '';
  tagIndividualInput = '';
  tagArrayInput : string[] = [];
  typeInput = '';
  severityInput = '';
  priorityInput = '';
  statusInput = '';
  fromInput = '';

  @Output() ticketCreated = new EventEmitter<Ticket>();

  onAddTicket() {
    const ticket: Ticket = {
      issue: this.issueInput,
      description: this.descriptionInput,
      tags: this.tagArrayInput.slice(),
      type: this.typeInput,
      severity: this.severityInput,
      priority: this.priorityInput,
      status: this.statusInput,
      from: this.fromInput,
      created: Date.now(),
    }
    this.ticketCreated.emit(ticket)
  }

  onAddTag() {
    this.tagArrayInput.push(this.tagIndividualInput);
  }

  onRemoveTag(i:number) {
    this.tagArrayInput.splice(i, 1)
  }
}
