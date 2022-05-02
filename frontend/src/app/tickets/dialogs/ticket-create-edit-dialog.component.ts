import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthService } from "../../auth/auth.service";
import { TicketCreate } from "../ticket-create.model";

@Component({
  selector: 'ticket-create-edit-dialog',
  templateUrl: './ticket-create-edit-dialog.html',
  styleUrls: ['./ticket-create-edit-dialog.component.css'],
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
      type:         [this.data.type, Validators.required],
      severity:     [this.data.severity, Validators.required],
      priority:     [this.data.priority, Validators.required],
      status:       [this.data.status],
    })
  }

  onSubmit() {
    let username = this.authService.getUsername();
    if (username === null) username = 'none';
    const ticket: TicketCreate = {
      issue: this.ticketForm.value.issue,
      description: this.ticketForm.value.description,
      tags: this.data.tags,
      type: this.ticketForm.value.type,
      severity: this.ticketForm.value.severity,
      priority: this.ticketForm.value.priority,
      status: this.ticketForm.value.status,
      from: username,
    };
    this.dialogRef.close(ticket)
  }

  addOnBlur = true;
  readonly separatorKeyCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.data.tags.push(value)
    }
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.data.tags.indexOf(tag);
    if (index >= 0) {
      this.data.tags.splice(index, 1)
    }
  }
}
