import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent {
  inputVal = '';
  issue = 'empty';

  onAddTicket() {
    this.issue = this.inputVal;
  }
}
