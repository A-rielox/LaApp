import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-benefits',
   templateUrl: './benefits.component.html',
   styleUrls: ['./benefits.component.css'],
})
export class BenefitsComponent implements OnInit {
   visible1 = false;
   visible2 = false;
   visible3 = false;

   constructor() {}

   ngOnInit(): void {}
}
