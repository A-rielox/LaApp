import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from '../_prime/prime.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../_shared/shared.module';
import { HeroComponent } from './hero/hero.component';
import { WhatAreComponent } from './what-are/what-are.component';
import { TabsComponent } from './tabs/tabs.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { FooterComponent } from './footer/footer.component';
import { MembersHomeComponent } from './members-home/members-home.component';
import { PostsHomeComponent } from './posts-home/posts-home.component';
import { RecipesHomeComponent } from './recipes-home/recipes-home.component';

@NgModule({
   declarations: [
      RegisterModalComponent,
      HomeComponent,
      HeroComponent,
      WhatAreComponent,
      TabsComponent,
      BenefitsComponent,
      FooterComponent,
      MembersHomeComponent,
      PostsHomeComponent,
      RecipesHomeComponent,
   ],
   imports: [CommonModule, PrimeModule, ReactiveFormsModule, SharedModule],
   exports: [],
})
export class HomeModule {}
