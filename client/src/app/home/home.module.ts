import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from '../_prime/prime.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { HomeComponent } from './home/home.component';

@NgModule({
   declarations: [RegisterModalComponent, HomeComponent],
   imports: [CommonModule, PrimeModule, ReactiveFormsModule],
   exports: [],
})
export class HomeModule {}
