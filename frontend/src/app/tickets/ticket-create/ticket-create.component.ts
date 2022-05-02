import { Component} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TicketDialogComponent } from '../dialogs/ticket-create-edit-dialog.component';
import { TicketCreate } from '../ticket-create.model';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent {
  blankTicket: TicketCreate = {
    issue: '',
    description: '',
    tags: [],
    type: '',
    severity: '',
    priority: '',
    status: 'nouveau',
    from: ''
  }

  constructor(
    public ticketsService: TicketsService,
    private router: Router,
    public dialog: MatDialog,
  ) {};

  openDialog(): void {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '600px',
      data: this.blankTicket,
    });

    dialogRef.afterClosed().subscribe(ticket => {
      if (!ticket) return;
      this.ticketsService.addTicket(ticket).subscribe();
      this.ticketsService.sendListUpdate();
      this.router.navigateByUrl('/');
    });
  }
}
