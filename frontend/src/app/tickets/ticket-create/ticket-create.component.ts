import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { TicketCreate } from '../ticket-create.model';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent {
  tagIndividualInput = '';
  tagArrayInput : string[] = [];

  createForm!: FormGroup;

  constructor(
    public ticketsService: TicketsService,
    private router: Router,
    public dialog: MatDialog,
  ) {};

  openDialog(): void {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(ticket => {
      this.ticketsService.addTicket(ticket).subscribe();
      this.ticketsService.sendListUpdate();
      this.router.navigateByUrl('/');
    });
  }
}

@Component({
  selector: 'dialog-ticket-create',
  templateUrl: './ticket-create-dialog.html',
})
export class TicketDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  createForm!: FormGroup;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      issue:        ['', Validators.required],
      description:  ['', Validators.required],
      tags:         [''],
      type:         ['', Validators.required],
      severity:     ['', Validators.required],
      priority:     ['', Validators.required],
      status:       [''],
    })
  }

  onSubmit() {
    let username = this.authService.getUsername();
    if (username === null) username = 'none';
    const ticket: TicketCreate = {
      issue: this.createForm.value.issue,
      description: this.createForm.value.description,
      tags: this.createForm.value.tags.split(','),
      type: this.createForm.value.type,
      severity: this.createForm.value.severity,
      priority: this.createForm.value.priority,
      status: 'nouveau',
      from: username,
    };
    this.dialogRef.close(ticket)
  }
}
