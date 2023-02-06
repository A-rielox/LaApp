import { Photo } from './photo';

export interface Member {
   id: number;
   userName: string;
   email: string;
   photoUrl: string;
   knownAs: string;
   lastActive: Date;
   introduction: string;
   interests: string;
   city: string;
   country: string;
   photos: Photo[];
}
