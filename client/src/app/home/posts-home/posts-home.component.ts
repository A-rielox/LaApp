import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/post';
import { DialogType, postsData, text, textEng, textEsp } from './postsHomeData';

@Component({
   selector: 'app-posts-home',
   templateUrl: './posts-home.component.html',
   styleUrls: ['./posts-home.component.css'],
})
export class PostsHomeComponent implements OnInit {
   openDialog = false;
   posts: Post[] = postsData;
   dialog: DialogType = {} as DialogType;

   // LANG
   @Input() lang: string = 'Eng';
   text: text = textEng;

   constructor() {}

   ngOnChanges(): void {
      this.text = this.lang === 'Esp' ? textEsp : textEng;

      // this.recipes = this.lang === 'Esp' ? recipesDataEsp : recipesDataEng;
   }

   ngOnInit(): void {}

   dialogToOpen(index: number) {
      this.openDialog = true;

      if (this.posts) {
         this.dialog.post = this.posts[index];
      }
   }

   border2Color(category: string) {
      switch (category) {
         case 'Piel':
            return 'border-color: #06d465';
         // return 'background: linear-gradient(15deg, #06d465, #06b6d4); border-top-width: 3px;';

         case 'Salud':
            return 'border-color: #f91616';
         // return 'background: linear-gradient(15deg, #f91616, #f97316); border-top-width: 3px;';

         case 'Malestares':
            return 'border-color: #cc63f1';
         // return 'background: linear-gradient(15deg, #cc63f1, #6366f1); border-top-width: 3px;';

         default:
            return 'border-color: #eae91c';
         // return 'background: linear-gradient(15deg, #eae91c, #6d1e70); border-top-width: 3px;';
      }
   }
}
