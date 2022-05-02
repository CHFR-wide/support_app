import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TicketDialogComponent } from '../dialogs/ticket-create-edit-dialog.component';
import { TicketGet } from '../ticket-get.model';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent{
  @Input()
  ticket!: TicketGet;
  editForm!: FormGroup;

  constructor(
    public ticketsService: TicketsService,
    public authService: AuthService,
    public dialog: MatDialog,
  ) {};

  openDialog(): void {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '600px',
      data: { ticket: this.ticket },
    });

    dialogRef.afterClosed().subscribe(ticket => {
      if (!ticket) return;
      this.ticketsService.editTicket(ticket, this.ticket._id).subscribe();
      this.ticketsService.sendListUpdate();
    });
  }
}
