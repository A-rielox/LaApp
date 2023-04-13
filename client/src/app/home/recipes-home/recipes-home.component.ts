import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Recipe } from 'src/app/_models/recipe';
import {
   DialogType,
   recipesDataEng,
   recipesDataEsp,
   text,
   textEng,
   textEsp,
} from './recipesHomeData';

@Component({
   selector: 'app-recipes-home',
   templateUrl: './recipes-home.component.html',
   styleUrls: ['./recipes-home.component.css'],
})
export class RecipesHomeComponent implements OnInit, OnChanges {
   openDialog = false;
   recipes: Recipe[] = recipesDataEng;
   dialog: DialogType = {} as DialogType;

   // LANG
   @Input() lang: string = 'Eng';
   text: text = textEng;

   constructor() {}

   ngOnChanges(): void {
      this.text = this.lang === 'Esp' ? textEsp : textEng;

      this.recipes = this.lang === 'Esp' ? recipesDataEsp : recipesDataEng;
   }

   ngOnInit(): void {}

   dialogToOpen(index: number) {
      this.openDialog = true;

      if (this.recipes) {
         this.dialog.recipe = this.recipes[index];
      }
   }

   borderColor(category: string) {
      switch (category) {
         // NO me reconoce con || --> "case 'Animo' || 'Mood'
         case 'Mood':
            return 'background: linear-gradient(15deg, #06d465, #06b6d4); border-left: 10px solid transparent;';
         case 'Ánimo':
            return 'background: linear-gradient(15deg, #06d465, #06b6d4); border-left: 10px solid transparent;';

         case 'Salud':
            return 'background: linear-gradient(15deg, #f91616, #f97316); border-left: 10px solid transparent;';
         case 'Health':
            return 'background: linear-gradient(15deg, #f91616, #f97316); border-left: 10px solid transparent;';

         case 'Malestares':
            return 'background: linear-gradient(15deg, #cc63f1, #6366f1); border-left: 10px solid transparent;';
         case 'Discomforts':
            return 'background: linear-gradient(15deg, #cc63f1, #6366f1); border-left: 10px solid transparent;';

         default:
            return 'background: linear-gradient(15deg, #eae91c, #6d1e70); border-left: 10px solid transparent;';
      }
   }
}

/*
import { Component, OnInit } from '@angular/core';
import { RecipeDisplayComponent } from 'src/app/recipes/recipe-display/recipe-display.component';
import { Recipe } from 'src/app/_models/recipe';
import { recipesData } from './recipesHomeData';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
   selector: 'app-recipes-home',
   templateUrl: './recipes-home.component.html',
   styleUrls: ['./recipes-home.component.css'],
   providers: [DialogService],
})
export class RecipesHomeComponent implements OnInit {
   openDialog = false;
   recipes?: Recipe[];

   refDisplayRecipe?: DynamicDialogRef;

   constructor(public dialogService: DialogService) {}

   ngOnInit(): void {
      this.recipes = recipesData;
   }

   displayRecipe(recipe: Recipe) {
      this.refDisplayRecipe = this.dialogService.open(RecipeDisplayComponent, {
         data: recipe,
         styleClass: 'displayRecipeClass',
         dismissableMask: true,
      });

      // al cerrar el modal de displayReceta por borrado o editar
      // this.refDisplayRecipe.onClose.subscribe({
      //    next: (modalRecipeDisplayCerrado: CloseModal) => {
      //       // por si se cierra con esc o picando fuera del modal
      //       if (!modalRecipeDisplayCerrado) return;

      //       if (modalRecipeDisplayCerrado.por === 'Receta-borrada') {
      //          // mientras casheo
      //          this.loadRecipes();
      //       }
      //    },
      // });
   }

   borderColor(category: string) {
      switch (category) {
         case 'Bebés':
            return 'background: linear-gradient(15deg, #06d465, #06b6d4); border-left: 10px solid transparent;';

         case 'Salud':
            return 'background: linear-gradient(15deg, #f91616, #f97316); border-left: 10px solid transparent;';

         case 'Belleza':
            return 'background: linear-gradient(15deg, #cc63f1, #6366f1); border-left: 10px solid transparent;';

         default:
            return 'background: linear-gradient(15deg, #eae91c, #6d1e70); border-left: 10px solid transparent;';
      }
   }
}

*/
