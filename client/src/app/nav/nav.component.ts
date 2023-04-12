import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AccountService } from '../_services/account.service';
import { text, textEng, textEsp } from './navLang';

@Component({
   selector: 'app-nav',
   templateUrl: './nav.component.html',
   styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
   items: MenuItem[] = [];
   navItems: MenuItem[] = [];

   selectedLang: string = 'Eng';
   text: text = textEng;

   constructor(
      public accountService: AccountService,
      private router: Router // private notification: NotificationsService
   ) {
      this.accountService.selectedLang$.subscribe({
         next: (lang) => {
            this.selectedLang = lang;

            this.text = lang === 'Esp' ? textEsp : textEng;
         },
      });
   }

   ngOnInit(): void {
      this.setItems();
   }

   logout() {
      this.accountService.logout();

      this.router.navigateByUrl('/');
   }

   changeLang(lang: string) {
      this.selectedLang = lang;

      this.accountService.selectedLang.next(lang === 'Eng' ? 'Eng' : 'Esp');

      this.setItems();
   }

   setItems() {
      this.items = [
         {
            label: this.text.editProfile,
            icon: 'pi pi-cog',
            routerLink: ['/members/edit'],
         },
         {
            label: this.text.logOut,
            icon: 'pi pi-sign-out',
            command: () => {
               this.logout();
            },
         },
      ];

      this.navItems = [
         {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: ['/'],
         },
         {
            label: 'Salir',
            icon: 'pi pi-sign-out',
         },
      ];
   }

   aClass() {
      return 'flex h-full px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 border-left-2 lg:border-bottom-2 lg:border-left-none border-transparent hover:border-primary font-medium cursor-pointer transition-colors transition-duration-150';
   }
}
