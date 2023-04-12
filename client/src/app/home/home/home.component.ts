import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
   lang: string = 'Eng';

   constructor(public accountService: AccountService) {
      this.accountService.selectedLang$.subscribe({
         next: (lang) => {
            this.lang = lang === 'Esp' ? 'Esp' : 'Eng';
         },
      });
   }

   ngOnInit(): void {}
}
