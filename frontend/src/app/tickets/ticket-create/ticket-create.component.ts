import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketCreate } from '../ticket-create.model';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  tagIndividualInput = '';
  tagArrayInput : string[] = [];

  createForm!: FormGroup;

  constructor(
    public ticketsService: TicketsService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {};

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
    let username = localStorage.getItem('username');
    if (username === null) username = 'none';
    const ticket: TicketCreate = {
      issue: this.createForm.value.issue,
      description: this.createForm.value.description,
      tags: this.createForm.value.tags.split(','),
      type: this.createForm.value.type,
      severity: this.createForm.value.severity,
      priority: this.createForm.value.priority,
      status: 'new',
      from: username,
    };
    this.ticketsService.addTicket(ticket).subscribe();
    this.ticketsService.sendListUpdate();
    this.router.navigateByUrl('/');
  }
}
