import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { text, textEng, textEsp } from './whatAreLang';

@Component({
   selector: 'app-what-are',
   templateUrl: './what-are.component.html',
   styleUrls: ['./what-are.component.css'],
})
export class WhatAreComponent implements OnInit, OnChanges {
   @Input() lang: string = 'Eng';
   text: text = textEng;

   constructor() {}

   ngOnInit(): void {}

   ngOnChanges(): void {
      this.text = this.lang === 'Esp' ? textEsp : textEng;
   }

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
