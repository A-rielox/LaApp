import { Component, OnInit } from '@angular/core';
import { Mem, memsData } from './membersHomeData';

@Component({
   selector: 'app-members-home',
   templateUrl: './members-home.component.html',
   styleUrls: ['./members-home.component.css'],
})
export class MembersHomeComponent implements OnInit {
   mems: Mem[] = memsData;

   constructor() {}

   ngOnInit(): void {}
}
