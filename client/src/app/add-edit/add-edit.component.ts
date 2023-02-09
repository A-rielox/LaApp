import { Component, OnInit } from '@angular/core';
import { Recipe } from '../_models/recipe';
import { Router } from '@angular/router';

@Component({
   selector: 'app-add-edit',
   templateUrl: './add-edit.component.html',
   styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
   recipeToEdit?: Recipe;
   navTitle?: string;

   constructor(private router: Router) {
      const navigation = this.router.getCurrentNavigation();
      this.recipeToEdit = navigation?.extras.state?.['recipe'];
   }

   ngOnInit(): void {
      if (this.recipeToEdit) {
         this.navTitle = 'Editar Receta';
      } else {
         this.navTitle = 'Añadir';
      }
   }
}
