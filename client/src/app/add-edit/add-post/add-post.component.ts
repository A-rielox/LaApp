import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { categoryList } from 'src/app/_models/optionLists';
import { EditedPost, NewPost, Post } from 'src/app/_models/post';
import { OilsAndCat } from 'src/app/_models/recipe';
import { PostsService } from 'src/app/_services/posts.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { text, textEng, textEsp } from './addPostLang';
import { AccountService } from 'src/app/_services/account.service';

@Component({
   selector: 'app-add-post',
   templateUrl: './add-post.component.html',
   styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
   componentMode: string = 'New';
   PostsForm: FormGroup = new FormGroup({});
   postToEdit?: Post;

   allCats?: OilsAndCat[];

   // el textArea
   text: string = '';

   //          LANG
   textL: text = textEng;

   constructor(
      private fb: FormBuilder,
      private postsService: PostsService,
      private notification: NotificationsService,
      private router: Router,
      private accountService: AccountService
   ) {
      const navigation = this.router.getCurrentNavigation();
      this.postToEdit = navigation?.extras.state?.['post'];

      this.accountService.selectedLang$.subscribe({
         next: (lang) => {
            this.textL = lang === 'Esp' ? textEsp : textEng;
         },
      });
   }

   ngOnInit(): void {
      this.initializeForm();
      this.allCats = categoryList;

      //          edicion
      if (this.postToEdit) {
         this.componentMode = 'Edit';

         const { id, title, category, content } = this.postToEdit;

         this.PostsForm.setValue({
            id,
            title,
            category: [{ name: category }],
            content, //-----> yellow
         });
      }
   }

   initializeForm() {
      this.PostsForm = this.fb.group({
         id: [-1, Validators.required],
         title: [
            '',
            [
               Validators.required,
               Validators.minLength(5),
               Validators.maxLength(50),
            ],
         ],
         content: [
            '',
            [
               Validators.required,
               Validators.minLength(30),
               Validators.maxLength(2000),
            ],
         ],
         category: [[], Validators.required],
      });
   }

   sendPost() {
      const { category, title, content, id } = this.PostsForm.value;

      if (!category || !title || !content) return;

      let cat = category[0]?.name;

      if (this.componentMode === 'New') {
         const newPost: NewPost = {
            title: title,
            category: cat,
            content: content,
         };

         this.postsService.addPost(newPost).subscribe({
            next: (postNuevo) => {
               //no estoy ocupando la respuesta hasta que cashee en front
               this.callNotificationAndLoadRecipes(this.textL.postAdded);
               this.PostsForm.reset();
            },
         });
      } else if (this.componentMode === 'Edit') {
         const editedPost: EditedPost = {
            id: id,
            title: title,
            category: cat,
            content: content,
         };

         this.postsService.editPost(editedPost).subscribe({
            next: (_) => {
               this.callNotificationAndLoadRecipes(this.textL.postEdited);
               this.PostsForm.reset();
               this.router.navigateByUrl('/posts');
            },
         });
      }
   }

   callNotificationAndLoadRecipes(detail: string) {
      this.notification.addNoti({
         severity: 'success',
         summary: this.textL.postSummary,
         detail: detail,
      });
   }
}
