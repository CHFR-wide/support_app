import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthService } from "../../auth/auth.service";
import { TicketCreate } from "../ticket-create.model";

export interface TicketDialogData {
  ticket: TicketCreate;
}

@Component({
  selector: 'dialog-ticket-create',
  templateUrl: './ticket-create-dialog.html',
})
export class TicketDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: TicketDialogData,
    private formBuilder: FormBuilder,
  ) {}

  ticketForm!: FormGroup;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      issue:        [this.data.ticket.issue, Validators.required],
      description:  [this.data.ticket.description, Validators.required],
      tags:         [this.data.ticket.tags.join(',')],
      type:         [this.data.ticket.type, Validators.required],
      severity:     [this.data.ticket.severity, Validators.required],
      priority:     [this.data.ticket.priority, Validators.required],
      status:       [this.data.ticket.status],
    })
  }

  onSubmit() {
    console.log(this.ticketForm.value);
    let username = this.authService.getUsername();
    if (username === null) username = 'none';
    const ticket: TicketCreate = {
      issue: this.ticketForm.value.issue,
      description: this.ticketForm.value.description,
      tags: this.ticketForm.value.tags.split(','),
      type: this.ticketForm.value.type,
      severity: this.ticketForm.value.severity,
      priority: this.ticketForm.value.priority,
      status: this.ticketForm.value.status,
      from: username,
    };
    this.dialogRef.close(ticket)
  }
}
