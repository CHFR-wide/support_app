import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TicketGet } from "../ticket-get.model";

@Component({
  selector: 'ticket-view-dialog',
  templateUrl: './ticket-view-dialog.html',
  styleUrls: ['./ticket-view-dialog.component.css']
})
export class TicketViewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TicketViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TicketGet,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
