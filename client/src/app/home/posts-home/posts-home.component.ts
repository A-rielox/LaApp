import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/post';
import {
   DialogType,
   postsDataEng,
   postsDataEsp,
   text,
   textEng,
   textEsp,
} from './postsHomeData';

@Component({
   selector: 'app-posts-home',
   templateUrl: './posts-home.component.html',
   styleUrls: ['./posts-home.component.css'],
})
export class PostsHomeComponent implements OnInit, OnChanges {
   openDialog = false;
   posts: Post[] = postsDataEng;
   dialog: DialogType = {} as DialogType;

   // LANG
   @Input() lang: string = 'Eng';
   text: text = textEng;

   constructor() {}

   ngOnChanges(): void {
      this.text = this.lang === 'Esp' ? textEsp : textEng;

      this.posts = this.lang === 'Esp' ? postsDataEsp : postsDataEng;
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
         // NO funcionan con || case 'Discomforts' || 'Malestares':
         case 'Piel':
            return 'border-color: #06d465';

         case 'Salud':
            return 'border-color: #f91616';
         case 'Health':
            return 'border-color: #f91616';

         case 'Malestares':
            return 'border-color: #cc63f1';
         case 'Discomforts':
            return 'border-color: #cc63f1';

         default:
            return 'border-color: #eae91c';
      }
   }
}
