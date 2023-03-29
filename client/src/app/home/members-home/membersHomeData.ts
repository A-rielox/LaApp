import { Post } from 'src/app/_models/post';

export interface DialogType {
   post: Post;
}

export interface Mem {
   name: string;
   city: string;
   desc: string;
   pic: string;
}

export const memsData: Mem[] = [
   {
      name: 'Todd',
      city: 'Monterrey',
      desc: 'string',
      pic: 'https://randomuser.me/api/portraits/men/90.jpg',
   },
   {
      name: 'Lisa',
      city: 'Monterrey',
      desc: 'string',
      pic: 'https://res.cloudinary.com/dxrrk3nvu/image/upload/v1679868007/LaApp/ylgkq71ylvshmmcwpa1h.webp',
   },
   {
      name: 'Lois',
      city: 'Saltillo',
      desc: 'string',
      pic: 'https://randomuser.me/api/portraits/women/11.jpg',
   },
   {
      name: 'Porter',
      city: 'Ciudad de Mex.',
      desc: 'string',
      pic: 'https://randomuser.me/api/portraits/men/87.jpg',
   },
];
