import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/core/services/api-data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  constructor(
    private _ApiDataService: ApiDataService,
  ) {
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      },
      1400: {
        items: 8
      }
    },
    nav: false,
    
  }

  categoriesData: any;
  subCategoriesData:any = null;
  
  ngOnInit(): void {


    this._ApiDataService.getAllCategories().subscribe({
      next: (response) => {
        this.categoriesData = response;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getSubCategory(catID:string){
    this._ApiDataService.getSubCategory(catID).subscribe({
      next: (response) => {
        this.subCategoriesData = response.data;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  
}
