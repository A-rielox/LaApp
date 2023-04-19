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

//////////////////////
export interface text {
   title: string;
}
export const textEng = {
   title: 'Meet part of the team.',
};
export const textEsp = {
   title: 'Conoce parte del equipo.',
};

export const memsDataEsp: Mem[] = [
   {
      name: 'Todd',
      city: 'Monterrey',
      desc: 'Hola hola, soy de Monterrey, me encanta la vida al aire libre y organizar carne asada. Tengo 27 años y me apasiona el poder mejorar la calidad de vida con métodos naturales que están al alcance de todos.',
      pic: 'https://randomuser.me/api/portraits/men/44.jpg',
   },
   {
      name: 'Lisa',
      city: 'Monterrey',
      desc: 'Soy Lisa, trabajo en nutrición y bienestar, por eso me fascina la posibilidad que ofrecen los aceites para mejorar la calidad de vida en general de las personas con algo tan sencillo como utilizar un aceite.',
      pic: 'https://randomuser.me/api/portraits/women/22.jpg',
   },
   {
      name: 'Lois',
      city: 'Saltillo',
      desc: 'Llevo más de 10 años usando y estudiando sobre los beneficios de los aceites, y aún sigo aprendiendo, me encanta compartir con todos lo que he aprendido en este viaje a través de esta magnífica comunidad.',
      pic: 'https://randomuser.me/api/portraits/women/33.jpg',
   },
   // {
   //    name: 'Porter',
   //    city: 'Ciudad de Mex.',
   //    desc: 'string',
   //    pic: 'https://randomuser.me/api/portraits/men/87.jpg',
   // },
];
export const memsDataEng: Mem[] = [
   {
      name: 'Todd',
      city: 'Tokio',
      desc: "Hello hello, I'm from Tokio, I love outdoor life and organizing roast meat. I am 27 years old and I am passionate about being able to improve the quality of life with natural methods that are available to everyone.",
      pic: 'https://randomuser.me/api/portraits/men/44.jpg',
   },
   {
      name: 'Lisa',
      city: 'New York',
      desc: "I'm Lisa, I work in nutrition and wellness, so I'm fascinated by the possibility that oils offer to improve people's overall quality of life with something as simple as using an oil.",
      pic: 'https://randomuser.me/api/portraits/women/22.jpg',
   },
   {
      name: 'Lois',
      city: 'London',
      desc: 'I have been using and studying the benefits of oils for more than 10 years, and I am still learning, I love sharing with everyone what I have learned on this journey through this magnificent community',
      pic: 'https://randomuser.me/api/portraits/women/33.jpg',
   },
];
