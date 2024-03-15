import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/core/services/api-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  constructor(
    private _ApiDataService: ApiDataService,
  ) {
  }
  brandsData: any;
  currentPage: number = 1;
  numberOfPages:number[] = [];

  ngOnInit(): void {
    this.getBrandsByPages(this.currentPage);
    
  }

  
  getBrandsByPages(currentPage:number){
    this.currentPage = currentPage;
    console.log(this.currentPage)
    this._ApiDataService.getBrandsByPages(currentPage).subscribe({
      next: (response) => {
        this.brandsData = response.data;
        if(this.numberOfPages.length ==0){
          for (let number = 1; number <= response.metadata.numberOfPages; number++) {
            this.numberOfPages.push(number)
          }
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
