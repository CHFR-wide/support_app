import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { TicketDialogComponent } from '../dialogs/ticket-create-edit-dialog.component';
import { TicketViewDialogComponent } from '../dialogs/ticket-view-dialog.component';
import { TicketGet } from '../ticket-get.model';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent{
  @Input()
  ticket!: TicketGet;
  editForm!: FormGroup;

  constructor(
    public ticketsService: TicketsService,
    public authService: AuthService,
    public dialog: MatDialog,
  ) {};

  openDialog(): void {
    const dialogRef = this.dialog.open(TicketViewDialogComponent, {
      width: '600px',
      data: this.ticket,
    });

    dialogRef.afterClosed().subscribe(ticket => {
      if (!ticket) return;
      this.ticketsService.editTicket(ticket, this.ticket._id).subscribe();
      this.ticketsService.sendListUpdate();
    });
  }
}
