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
      desc: 'Hola hola, soy de Monterrey, me encanta la vida al aire libre y organizar carne asada. Tengo 27 años y me apasiona el poder mejorar la calidad de vida con métodos naturales que están al alcance de todos.',
      pic: 'https://randomuser.me/api/portraits/men/90.jpg',
   },
   {
      name: 'Lisa',
      city: 'Monterrey',
      desc: 'Soy Lisa, trabajo en nutrición y bienestar, por eso me fascina la posibilidad que ofrecen los aceites para mejorar la calidad de vida en general de las personas con algo tan sencillo como utilizar un aceite.',
      pic: 'https://res.cloudinary.com/dxrrk3nvu/image/upload/v1679868007/LaApp/ylgkq71ylvshmmcwpa1h.webp',
   },
   {
      name: 'Lois',
      city: 'Saltillo',
      desc: 'Llevo más de 10 años usando y estudiando sobre los beneficios de los aceites, y aún sigo aprendiendo, me encanta compartir con todos lo que he aprendido en este viaje a través de esta magnífica comunidad.',
      pic: 'https://randomuser.me/api/portraits/women/11.jpg',
   },
   // {
   //    name: 'Porter',
   //    city: 'Ciudad de Mex.',
   //    desc: 'string',
   //    pic: 'https://randomuser.me/api/portraits/men/87.jpg',
   // },
];
