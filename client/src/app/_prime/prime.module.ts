import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleClassModule } from 'primeng/styleclass';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      ButtonModule,
      MenuModule,
      MenubarModule,
      DropdownModule,
      AvatarModule,
      StyleClassModule,
      DialogModule,
      InputTextModule,
   ],
   exports: [
      ButtonModule,
      MenuModule,
      MenubarModule,
      DropdownModule,
      AvatarModule,
      StyleClassModule,
      DialogModule,
      InputTextModule,
   ],
})
export class PrimeModule {}
