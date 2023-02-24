import { Component, OnInit } from '@angular/core';
import { benefitsData, BenefitsData } from './benefitsData';

@Component({
   selector: 'app-benefits',
   templateUrl: './benefits.component.html',
   styleUrls: ['./benefits.component.css'],
})
export class BenefitsComponent implements OnInit {
   openDialog = false;

   data?: BenefitsData[];

   dialog = { header: '', title: '', desc: '', img: '' };

   constructor() {}

   ngOnInit(): void {
      this.data = benefitsData;
   }

   dialogToOpen(index: number) {
      this.openDialog = true;

      if (this.data) {
         this.dialog.header = this.data[index].title;
         this.dialog.title = this.data[index].dialogTitle;
         this.dialog.desc = this.data[index].longDesc;
         this.dialog.img = this.data[index].image;
      }
   }
}
