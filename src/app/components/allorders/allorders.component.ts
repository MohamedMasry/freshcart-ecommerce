import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/core/services/api-data.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit{
  constructor(
    private _ApiDataService: ApiDataService,
  ) { }

  userDetails: any;
  userOrders:any = [];

  ngOnInit(): void {

    this.userDetails = this._ApiDataService.getUserData();

    this._ApiDataService.getUserOrders(this.userDetails.id).subscribe({
      next: (response) => {
        this.userOrders = response;
      },
      error: (err) => {
        console.log(err)
      }
    })

  }
}
