import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketGet } from '../ticket-get.model';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit{
  @Input()
  ticket!: TicketGet;
  editForm!: FormGroup;

  @Output()
  editDone: EventEmitter<string> = new EventEmitter<string>()


  constructor(
    public ticketsService: TicketsService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {};

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      issue:        [this.ticket.issue, Validators.required],
      description:  [this.ticket.description, Validators.required],
      tags:         [this.ticket.tags],
      type:         [this.ticket.type, Validators.required],
      severity:     [this.ticket.severity, Validators.required],
      priority:     [this.ticket.priority, Validators.required],
      status:       [this.ticket.status, Validators.required],
    });
  }

  onSubmit() {
    this.ticketsService.editTicket(this.editForm.value, this.ticket._id).subscribe();
    this.ticketsService.sendListUpdate();
    this.editDone.emit(this.ticket._id);
  }
}
