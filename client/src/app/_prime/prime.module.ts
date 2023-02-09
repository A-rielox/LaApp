import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleClassModule } from 'primeng/styleclass';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { CheckboxModule } from 'primeng/checkbox';

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
      DynamicDialogModule,
      InputTextModule,
      DividerModule,
      TabViewModule,
      GalleriaModule,
      InputTextareaModule,
      SelectButtonModule,
      TableModule,
      ProgressBarModule,
      CheckboxModule,
   ],
   exports: [
      ButtonModule,
      MenuModule,
      MenubarModule,
      DropdownModule,
      AvatarModule,
      StyleClassModule,
      DialogModule,
      DynamicDialogModule,
      InputTextModule,
      DividerModule,
      TabViewModule,
      GalleriaModule,
      InputTextareaModule,
      SelectButtonModule,
      TableModule,
      ProgressBarModule,
      CheckboxModule,
   ],
})
export class PrimeModule {}
