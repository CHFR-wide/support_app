import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthService } from "../../auth/auth.service";
import { TicketCreate } from "../ticket-create.model";

@Component({
  selector: 'ticket-create-edit-dialog',
  templateUrl: './ticket-create-edit-dialog.html',
})
export class TicketDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TicketCreate,
    public authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ticketForm!: FormGroup;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      issue:        [this.data.issue, Validators.required],
      description:  [this.data.description, Validators.required],
      tags:         [this.data.tags.join(',')],
      type:         [this.data.type, Validators.required],
      severity:     [this.data.severity, Validators.required],
      priority:     [this.data.priority, Validators.required],
      status:       [this.data.status],
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
