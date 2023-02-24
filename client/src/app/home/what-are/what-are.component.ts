import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-what-are',
   templateUrl: './what-are.component.html',
   styleUrls: ['./what-are.component.css'],
})
export class WhatAreComponent implements OnInit {
   constructor() {}

   ngOnInit(): void {}

   paragraph() {
      return (
         'text-white-alpha-70 line-height-3 text-center mx-auto mb-5' +
         'text-base md:text-lg lg:text-xl'
      );
   }

   /* 
   borderColor(category: string) {
      switch (category) {
         case 'Bebés':
            return 'background: linear-gradient(15deg, #06d465, #06b6d4); border-left: 10px solid transparent;';

         case 'Salud':
            return 'background: linear-gradient(15deg, #f91616, #f97316); border-left: 10px solid transparent;';

         case 'Belleza':
            return 'background: linear-gradient(15deg, #cc63f1, #6366f1); border-left: 10px solid transparent;';

         default:
            return 'background: linear-gradient(15deg, #eae91c, #6d1e70); border-left: 10px solid transparent;';
      }
   }
   */
}
