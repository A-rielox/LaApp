import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { text, textEng, textEsp } from './tabsLang';

@Component({
   selector: 'app-tabs',
   templateUrl: './tabs.component.html',
   styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit, OnChanges {
   @Input() lang: string = 'Eng';
   text: text = textEsp;

   /////////////////////////////
   // activeTab1 = 0;
   /////////////////////////////

   /* items = [
      {
         icon: 'pi pi-bolt',
         name: this.text.name1,
         description: this.text.description1,
      },
      {
         icon: 'pi pi-home',
         name: this.text.name2,
         description: this.text.description2,
      },
      {
         icon: 'pi pi-heart',
         name: this.text.name3,
         description: this.text.description3,
      },
   ]; */

   items = this.setItems();
   selectedItem = this.items[0];

   ngOnChanges(): void {
      this.text = this.lang === 'Esp' ? textEsp : textEng;

      this.items = this.setItems();
      this.selectedItem = this.items[0];
   }

   setItems() {
      return [
         {
            icon: 'pi pi-bolt',
            name: this.lang === 'Esp' ? textEsp.name1 : textEng.name1,
            description:
               this.lang === 'Esp'
                  ? textEsp.description1
                  : textEng.description1,
         },
         {
            icon: 'pi pi-home',
            name: this.lang === 'Esp' ? textEsp.name2 : textEng.name2,
            description:
               this.lang === 'Esp'
                  ? textEsp.description2
                  : textEng.description2,
         },
         {
            icon: 'pi pi-heart',
            name: this.lang === 'Esp' ? textEsp.name3 : textEng.name3,
            description:
               this.lang === 'Esp'
                  ? textEsp.description3
                  : textEng.description3,
         },
      ];
   }

   constructor() {}

   ngOnInit(): void {}
}
