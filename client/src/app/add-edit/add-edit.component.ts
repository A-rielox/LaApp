import { Component, OnInit } from '@angular/core';
import { Recipe } from '../_models/recipe';
import { Router } from '@angular/router';
import { Post } from '../_models/post';

@Component({
   selector: 'app-add-edit',
   templateUrl: './add-edit.component.html',
   styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
   navTitle?: string;
   recipeToEdit?: Recipe;
   postToEdit?: Post;
   newsToEdit?: any;

   edit?: boolean;

   constructor(private router: Router) {
      const navigation = this.router.getCurrentNavigation();
      this.recipeToEdit = navigation?.extras.state?.['recipe'];
      this.postToEdit = navigation?.extras.state?.['post'];

      this.edit = this.recipeToEdit || this.postToEdit ? true : false;
   }

   ngOnInit(): void {
      if (this.recipeToEdit) {
         this.navTitle = 'Editar Receta';
      } else if (this.postToEdit) {
         this.navTitle = 'Editar Post';
      } else {
         this.navTitle = 'Añadir';
      }
   }

   //////////////////////////
   buttonCss() {
      return 'flex px-3 py-2 align-items-center font-medium border-round cursor-pointer transition-colors transition-duration-150';
   }
}
