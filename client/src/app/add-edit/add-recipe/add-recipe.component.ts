import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { categoryList, oilsList } from 'src/app/_models/optionLists';
// prettier-ignore
import { EditedRecipe, NewRecipe, OilsAndCat, Recipe } from 'src/app/_models/recipe';
import { AccountService } from 'src/app/_services/account.service';
import { RecipesService } from 'src/app/_services/recipes.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { text, textEng, textEsp } from './addRecipeLang';

@Component({
   selector: 'app-add-recipe',
   templateUrl: './add-recipe.component.html',
   styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
   componentMode: string = 'New';
   registerForm: FormGroup = new FormGroup({});
   recipeToEdit?: Recipe;

   allOils?: OilsAndCat[];
   allCats?: OilsAndCat[];
   selectedOilsToDisplay?: string[];

   lang: string = 'Eng';
   text: text = textEng;

   constructor(
      private fb: FormBuilder,
      private recipesService: RecipesService,
      private notification: NotificationsService,
      private router: Router,
      private accountService: AccountService
   ) {
      const navigation = this.router.getCurrentNavigation();
      this.recipeToEdit = navigation?.extras.state?.['recipe'];

      this.accountService.selectedLang$.subscribe({
         next: (lang) => {
            this.lang = lang;

            this.text = lang === 'Esp' ? textEsp : textEng;
         },
      });
   }

   ngOnInit(): void {
      this.initializeForm();
      this.allOils = oilsList;
      this.allCats = categoryList;

      //          edicion
      if (this.recipeToEdit) {
         this.componentMode = 'Edit';

         const { id, title, category, content, oilsList } = this.recipeToEdit;

         const selectedOils = oilsList.split(',').map((oil) => {
            return { name: oil };
         });

         this.registerForm.setValue({
            id,
            title,
            category: [{ name: category }],
            content,
            oilsList: selectedOils,
         });

         this.defineList();
      }
   }
   // prettier-ignore
   initializeForm() {
      this.registerForm = this.fb.group({
         id: [-1, Validators.required],
         title: [
            '',
            [ Validators.required, Validators.minLength(5), Validators.maxLength(50) ],
         ],
         content: [
            '',
            [ Validators.required, Validators.minLength(50), Validators.maxLength(1300) ],
         ],
         oilsList: [[], Validators.required],
         category: [[], Validators.required],
      });
   }

   register() {
      const { oilsList, category, title, content, id } =
         this.registerForm.value;

      if (!oilsList || !category || !title || !content) return;

      let oils = oilsList.map((sel: { name: string }) => sel.name).join(',');
      let cat = category[0]?.name;

      if (this.componentMode === 'New') {
         const newRecipe: NewRecipe = {
            title: title,
            category: cat,
            content: content,
            oilsList: oils,
         };

         this.recipesService.addRecipe(newRecipe).subscribe({
            next: (recetaNueva) => {
               //no estoy ocupando la respuesta hasta que cashee en front
               this.callNotificationAndLoadRecipes(this.text.recipeAdded);
               this.registerForm.reset();
            },
         });
      } else if (this.componentMode === 'Edit') {
         const editedRecipe: EditedRecipe = {
            id: id,
            title: title,
            category: cat,
            content: content,
            oilsList: oils,
         };

         this.recipesService.editRecipe(editedRecipe).subscribe({
            next: (_) => {
               this.callNotificationAndLoadRecipes(this.text.recipeEdited);
               this.registerForm.reset();
               this.router.navigateByUrl('/recetas');
            },
         });
      }
   }

   callNotificationAndLoadRecipes(detail: string) {
      this.notification.addNoti({
         severity: 'success',
         summary: this.text.recipeSummary,
         detail: detail,
      });
   }

   change() {
      this.defineList();
   }

   defineList() {
      this.selectedOilsToDisplay = this.registerForm.value.oilsList.map(
         (oil: { name: string }) => oil.name
      );
   }
}
