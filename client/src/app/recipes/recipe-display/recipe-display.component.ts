import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Recipe } from 'src/app/_models/recipe';
import { AccountService } from 'src/app/_services/account.service';
import { RecipesService } from 'src/app/_services/recipes.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { text, textEng, textEsp } from './recipeDisplayLang';

@Component({
   selector: 'app-recipe-display',
   templateUrl: './recipe-display.component.html',
   styleUrls: ['./recipe-display.component.css'],
   providers: [ConfirmationService],
})
export class RecipeDisplayComponent implements OnInit {
   recipe?: Recipe;
   text: text = textEng;

   constructor(
      public recipesService: RecipesService,
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig,
      private confirmationService: ConfirmationService,
      private notification: NotificationsService,
      private router: Router,
      private accountService: AccountService
   ) {
      this.accountService.selectedLang$.subscribe({
         next: (lang) => {
            this.text = lang === 'Eng' ? textEng : textEsp;
         },
      });
   }

   ngOnInit(): void {
      this.recipe = this.config.data;
   }

   onEdit() {
      // this.ref.close(); p' cerra este modal
      this.ref.close();
      const navigationExtras: NavigationExtras = {
         state: { recipe: this.recipe },
      };

      this.router.navigateByUrl('/add-edit/recipe', navigationExtras);
   }

   // pop-up de confirmar borrado
   confirm(event: Event) {
      if (!event.target) return;

      this.confirmationService.confirm({
         target: event.target,
         message: this.text.confirmMsg,
         acceptLabel: this.text.confirmAccept,
         rejectLabel: this.text.confirmReject,
         icon: 'pi pi-exclamation-triangle',
         accept: () => {
            if (!this.recipe) return;

            // borro desde acá solo xq el otro componente está muy grande 👍
            this.recipesService.deleteRecipe(this.recipe.id).subscribe({
               next: (_) => {
                  this.notification.addNoti({
                     severity: 'success',
                     summary: this.text.notificationSummary,
                     detail: this.text.notificationDetail,
                  });

                  // red red mientras casheo
                  // desde aqui solo p' mandar la señal y q recarge las recetas a tiempo
                  this.ref.close({
                     por: 'Receta-borrada',
                     id: -1,
                  });
               },
            });

            // this.ref.close('OK');
         },
         reject: () => {},
      });
   }
}
