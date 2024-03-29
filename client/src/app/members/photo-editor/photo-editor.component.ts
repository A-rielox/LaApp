import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
   selector: 'app-photo-editor',
   templateUrl: './photo-editor.component.html',
   styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
   @Input() member: Member | undefined;
   @Input() lang: string = 'Eng';

   uploader: FileUploader | undefined;
   hasBaseDropZoneOver = false;
   baseUrl = environment.apiUrl;
   user: User | undefined;

   constructor(
      private accountService: AccountService,
      private memberService: MembersService
   ) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
         next: (user) => {
            if (user) this.user = user;
         },
      });
   }

   ngOnInit(): void {
      this.initializeUploader();
   }

   fileOverBase(e: any) {
      this.hasBaseDropZoneOver = e;
   }

   setMainPhoto(photo: Photo) {
      this.memberService.setMainPhoto(photo.id).subscribe({
         next: () => {
            // p' actualizar el user y member q estan almacenados aca en el front ( en el service )
            if (this.user && this.member) {
               this.user.photoUrl = photo.url;
               // yellow  actualizo el user 👇, xq como pa agarrar la foto main, los componentes la agarran a traves de un Observable , => este desencadena el cambio para q se actualizen los que estan suscritos yellow
               this.accountService.setCurrentUser(this.user);

               this.member.photoUrl = photo.url;
               this.member.photos.forEach((p) => {
                  if (p.isMain) p.isMain = false;
                  if (p.id === photo.id) p.isMain = true;
               });
            }
         },
      });
   }

   deletePhoto(photoId: number) {
      this.memberService.deletePhoto(photoId).subscribe({
         next: () => {
            if (this.member) {
               this.member.photos = this.member.photos.filter(
                  (p) => p.id !== photoId
               );
            }
         },
      });
   }

   // necesito ponerle el token xq este req no va a pasar xel interceptor
   initializeUploader() {
      this.uploader = new FileUploader({
         url: this.baseUrl + 'users/add-photo',
         authToken: 'Bearer ' + this.user?.token,
         isHTML5: true,
         allowedFileType: ['image'],
         removeAfterUpload: true,
         autoUpload: false,
         maxFileSize: 1 * 1024 * 1024, // 1 megas
      });

      this.uploader.onAfterAddingFile = (file) => {
         // no se necesita xq se estan mandando en el token
         file.withCredentials = false;
      };

      this.uploader.onSuccessItem = (item, response, status, headers) => {
         if (response) {
            const photo: Photo = JSON.parse(response);
            this.member?.photos.push(photo);

            if (photo.isMain && this.user && this.member) {
               this.user.photoUrl = photo.url;
               this.member.photoUrl = photo.url;

               this.accountService.setCurrentUser(this.user);
            }
         }
      };
   }
}
