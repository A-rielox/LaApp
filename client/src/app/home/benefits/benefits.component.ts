import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
   benefitsData,
   BenefitsData,
   benefitsDataEng,
   DialogType,
   text,
   textEng,
   textEsp,
} from './benefitsData';

@Component({
   selector: 'app-benefits',
   templateUrl: './benefits.component.html',
   styleUrls: ['./benefits.component.css'],
})
export class BenefitsComponent implements OnInit, OnChanges {
   openDialog = false;
   data?: BenefitsData[];
   dialog: DialogType = {} as DialogType;

   // LANG
   @Input() lang: string = 'Eng';
   text: text = textEng;

   constructor() {}

   ngOnChanges(): void {
      this.text = this.lang === 'Esp' ? textEsp : textEng;

      this.setLang();
   }

   ngOnInit(): void {
      this.setLang();
   }

   setLang() {
      this.data = this.lang === 'Esp' ? benefitsData : benefitsDataEng;
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
