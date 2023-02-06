import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
   declarations: [],
   imports: [CommonModule, NgxSpinnerModule.forRoot({ type: 'pacman' })],
   exports: [NgxSpinnerModule],
})
export class SharedModule {}
