import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';
import { UserParams } from '../_models/userParams';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
   providedIn: 'root',
})
export class MembersService {
   baseUrl = environment.apiUrl;
   members: Member[] = [];
   memberCache = new Map();

   userParams: UserParams | undefined; // aqui tengo los filtros

   constructor(private http: HttpClient) {
      this.userParams = new UserParams();
   }

   ///////////////////////////////////////////
   //////////  PARAMS
   ///////////////////////////////////////////
   getUserParams() {
      return this.userParams;
   }

   setUserParams(params: UserParams) {
      this.userParams = params;
   }

   resetUserParams() {
      // if (this.user) {
      this.userParams = new UserParams(/* this.user */);

      return this.userParams;
      // }

      // return;
   }
   ///////////////////////////////////////////
   //////////  MEMBERS
   ///////////////////////////////////////////
   getMembers(userParams: UserParams) {
      const response = this.memberCache.get(
         Object.values(userParams).join('-')
      );
      if (response) return of(response);

      // solo los q conciernen a paginacion
      let params = getPaginationHeaders(
         userParams.pageNumber,
         userParams.pageSize
      );

      params = params.append('orderBy', userParams.orderBy);

      // "observe: 'response'" me da acceso a toda la response
      return getPaginatedResult<Member[]>(
         this.baseUrl + 'users',
         params,
         this.http
      ).pipe(
         map((response) => {
            this.memberCache.set(Object.values(userParams).join('-'), response);

            return response;
         })
      );
   }

   //             memberCache
   // key: '1-5-lastActive';
   // value: PaginatedResult:
   //                      pagination: {
   //                         currentPage: 1;
   //                         itemsPerPage: 5;
   //                         totalItems: 11;
   //                         totalPages: 3;
   //                      };
   //                      result: (5) [{…}, {…}, {…}, {…}, {…}]

   getMember(username: string) {
      // const member = this.members.find((m) => m.userName === username);
      // if (member) return of(member);
      const member = [...this.memberCache.values()]
         .reduce((arr, elem) => arr.concat(elem.result), [])
         .find((member: Member) => member.userName === username);
      // el reduce me devuelve un array de members

      if (member) return of(member);

      return this.http.get<Member>(this.baseUrl + 'users/' + username);
   }

   updateMember(member: Member) {
      return this.http.put(this.baseUrl + 'users', member).pipe(
         map(() => {
            const index = this.members.indexOf(member);

            this.members[index] = { ...this.members[index], ...member };
         })
      );
   }

   ///////////////////////////////////////////
   //////////  FOTOS
   ///////////////////////////////////////////
   setMainPhoto(photoId: number) {
      return this.http.put(
         this.baseUrl + 'users/set-main-photo/' + photoId,
         {}
      );
   }

   deletePhoto(photoId: number) {
      return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
   }

   /* 
   getHttpOptions() {
      const userString = localStorage.getItem('user');

      if (!userString) return;

      const user = JSON.parse(userString);

      return {
         headers: new HttpHeaders({
            Authorization: 'Bearer ' + user.token,
         }),
      };
   }
    */

   ///////////////////////////////////////////
   //////////  LIKES
   ///////////////////////////////////////////

   // para dar like, el username es de a quien se le da el like
   addLike(username: string) {
      return this.http.post(this.baseUrl + 'likes/' + username, {});
   }

   // p' agarrar los likes de un user
   //
   // api/likes?predicate=liked   --> los q me han gustado
   // api/likes?predicate=likedBy --> a los q les e gustado
   getLikes(predicate: string, pageNumber: number, pageSize: number) {
      let params = getPaginationHeaders(pageNumber, pageSize);

      params = params.append('predicate', predicate);

      return getPaginatedResult<Member[]>(
         this.baseUrl + 'likes',
         params,
         this.http
      );

      // return this.http.get<Member[]>(
      //    this.baseUrl + 'likes?predicate=' + predicate
      // );
   }
}
