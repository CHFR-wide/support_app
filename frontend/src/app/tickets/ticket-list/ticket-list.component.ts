import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service';

import { TicketGet } from '../ticket-get.model';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements AfterViewInit{
  sub: Subscription = new Subscription;
  editing: string[] = [];
  dataSource = new MatTableDataSource<TicketGet>();
  displayedColumns: string[] = ['issue','from','status','type','severity','created','actions',]

  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public ticketsService: TicketsService,
    public authService: AuthService,
    ) {}

  ngOnInit(): void {
    this.getTickets();
    this.sub = this.ticketsService.getListUpdate().subscribe(
      () => {this.getTickets()}
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getTickets() {
    this.ticketsService.getTickets().subscribe(
      (found: TicketGet[]) => {
        this.dataSource.data = found;
        console.dir(this.dataSource.data)
      }
    );
  }
}
