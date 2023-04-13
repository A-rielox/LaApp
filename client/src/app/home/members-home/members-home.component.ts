import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
   Mem,
   memsDataEng,
   memsDataEsp,
   text,
   textEng,
   textEsp,
} from './membersHomeData';

@Component({
   selector: 'app-members-home',
   templateUrl: './members-home.component.html',
   styleUrls: ['./members-home.component.css'],
})
export class MembersHomeComponent implements OnInit, OnChanges {
   mems: Mem[] = memsDataEng;

   // LANG
   @Input() lang: string = 'Eng';
   text: text = textEng;

   constructor() {}

   ngOnChanges(): void {
      this.text = this.lang === 'Esp' ? textEsp : textEng;

      this.mems = this.lang === 'Esp' ? memsDataEsp : memsDataEng;
   }

   ngOnInit(): void {}
}
