import { Component, OnInit } from '@angular/core';
import { Recipe } from '../_models/recipe';
import { Router } from '@angular/router';
import { Post } from '../_models/post';
import { AccountService } from '../_services/account.service';

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
   lang: string = 'Eng';

   constructor(private router: Router, private accountService: AccountService) {
      const navigation = this.router.getCurrentNavigation();
      this.recipeToEdit = navigation?.extras.state?.['recipe'];
      this.postToEdit = navigation?.extras.state?.['post'];

      this.edit = this.recipeToEdit || this.postToEdit ? true : false;

      //          LANG
      this.accountService.selectedLang$.subscribe({
         next: (lang) => {
            this.lang = lang;

            if (this.recipeToEdit) {
               this.navTitle =
                  this.lang === 'Esp' ? 'Editar Receta' : 'Edit Recipe';
            } else if (this.postToEdit) {
               this.navTitle =
                  this.lang === 'Esp' ? 'Editar Post' : 'Edit Post';
            } else {
               this.navTitle = this.lang === 'Esp' ? 'Añadir' : 'Add';
            }
         },
      });
   }

   ngOnInit(): void {
      // if (this.recipeToEdit) {
      //    this.navTitle = this.lang === 'Esp' ? 'Editar Receta' : 'Edit Recipe';
      // } else if (this.postToEdit) {
      //    this.navTitle = this.lang === 'Esp' ? 'Editar Post' : 'Edit Post';
      // } else {
      //    this.navTitle = this.lang === 'Esp' ? 'Añadir' : 'Add';
      // }
   }

   //////////////////////////
   buttonCss() {
      return 'flex px-3 py-2 align-items-center font-medium border-round cursor-pointer transition-colors transition-duration-150';
   }
}
