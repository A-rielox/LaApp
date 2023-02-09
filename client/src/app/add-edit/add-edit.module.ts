import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditComponent } from './add-edit.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from '../_prime/prime.module';

@NgModule({
   declarations: [AddEditComponent, AddPostComponent, AddRecipeComponent],
   imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeModule],
   exports: [AddRecipeComponent, AddPostComponent, AddEditComponent],
})
export class AddEditModule {}
