import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { TextInputComponent } from './text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from '../_prime/prime.module';

@NgModule({
   declarations: [TextInputComponent],
   imports: [
      CommonModule,
      NgxSpinnerModule.forRoot({ type: 'pacman' }),
      FileUploadModule,
      ReactiveFormsModule,
      PrimeModule,
   ],
   exports: [NgxSpinnerModule, FileUploadModule, TextInputComponent],
})
export class SharedModule {}
