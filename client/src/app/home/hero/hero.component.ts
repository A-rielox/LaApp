import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { text, textEng, textEsp } from './heroLang';
import { AccountService } from 'src/app/_services/account.service';

@Component({
   selector: 'app-hero',
   templateUrl: './hero.component.html',
   styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, OnChanges {
   @Input() lang: string = 'Eng';
   text: text = textEng;

   constructor() {}

   ngOnInit(): void {}

   ngOnChanges(): void {
      this.text = this.lang === 'Esp' ? textEsp : textEng;
   }
}
