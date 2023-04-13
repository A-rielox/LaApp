export interface BenefitsData {
   card: boolean;
   icon: string;
   iconBgColor: string;
   title: string;
   dialogTitle: string;
   shortDesc: string;
   longDesc: string[];
   image: string;
}

export interface DialogType {
   header: string;
   title: string;
   desc: string[];
   img: string;
}

//////////////////////

export interface text {
   title: string;
   subtitle: string;
   btn: string;
}

export const textEsp = {
   title: '¿Cómo usar los aceites esenciales?',
   subtitle:
      'Con tantos aceites esenciales a su alcance que tienen tantos usos posibles, seguramente se preguntará cómo usarlos todos. No se preocupe, con un poco de ayuda, ¡será un profesional en poco tiempo!',
   btn: 'Conocer más',
};

export const textEng = {
   title: 'How to use essential oils?',
   subtitle:
      "With so many essential oils at your fingertips that have so many possible uses, you may be wondering how to use them all. Don't worry, with a little help, you'll be a pro in no time!",
   btn: 'Know more',
};

////////////////////////

export const benefitsData = [
   {
      card: false,
      icon: 'pi pi-cloud text-green-600',
      iconBgColor: 'bg-green-100',
      title: 'Aromático',
      dialogTitle: 'Respirarlo.',
      shortDesc:
         '¡La manera más sencilla de disfrutar los beneficios aromáticos de los aceites esenciales es respirándolos!',
      longDesc: [
         '¡La manera más sencilla de disfrutar los beneficios aromáticos de los aceites esenciales es respirándolos!',
         '¿Alguna vez has caminado dentro de un spa y te has deleitado con el aroma de los aceites esenciales de Árbol de Té y Eucalipto? ¿O quizás has sentido la calma del aroma del aceite de Lavanda? Todo lo que se requiere es colocar algunas gotas de aceite esencial en las palmas de tus manos. Enseguida coloca tus manos en forma ahuecada ligeramente sobre tu boca y nariz e inhala, respira profundamente durante el tiempo que sea necesario.',
         'También podrías usar un difusor para aceites esenciales para llenar tu hogar u oficina con tus aromas favoritos o agregar algunas gotas de tus aceites esenciales favoritos en una bolita de algodón y colocarlas en donde desees que se disperse el aroma.',
      ],
      image: '../../assets/images/aromatico.jpg',
   },
   {
      card: false,
      icon: 'pi pi-thumbs-up text-yellow-600',
      iconBgColor: 'bg-yellow-100',
      title: 'Tópico',
      dialogTitle: 'Unas gotas en la piel.',
      shortDesc:
         'Unas gotas en la piel. El uso tópico de los aceites esenciales es uno de los más populares.',
      longDesc: [
         'El uso tópico de los aceites esenciales es uno de los más populares. Generalmente, descubrir cómo usar los aceites esenciales en la piel es lo que convierte a las personas de usuarios casuales a devotos de los aceites esenciales.',
         'Éstos pueden ayudar a mejorar la apariencia de una piel saludable y hacer que un masaje relajante se vuelva extra suave o bien agregar más energía a uno ya vigorizante.',
         'Para usar aceites esenciales de Young Living, puedes disfrutar de una gran variedad de beneficios aplicándolos, especialmente, en tu nuca, detrás de las orejas, en tu cuello, sienes y en las plantas de los pies. De igual manera, si el aroma de un aceite es demasiado fuerte o tu piel es sensible, puedes diluirlo con aceite portador como el Complejo de Aceites Esenciales V-6™ de Young Living.',
      ],
      image: '../../assets/images/topico.jpg',
   },
   {
      card: false,
      icon: 'pi pi-apple text-purple-600',
      iconBgColor: 'bg-purple-100',
      title: 'Interno',
      dialogTitle: 'Uno con tu cuerpo.',
      shortDesc:
         'Uno con tu cuerpo. ¿Sabías que puedes obtener los beneficios de los aceites esenciales ingiriéndolos?',
      longDesc: [
         '¿Sabías que puedes obtener los beneficios de los aceites esenciales ingiriéndolos?',
         'La línea Vitality™ de Young Living fue desarrollada para brindar una clara distinción entre los aceites de uso interno y aquellos de uso tópico y aromático.',
         'Todos proporcionan los mismos aceites esenciales puros y auténticos; ¡solo que los hemos etiquetado de manera diferente para que no haya confusión!',
      ],
      image: '../../assets/images/interno.jpg',
   },
];

export const benefitsDataEng = [
   {
      card: false,
      icon: 'pi pi-cloud text-green-600',
      iconBgColor: 'bg-green-100',
      title: 'Aromatic',
      dialogTitle: 'Breathe it.',
      shortDesc:
         'The easiest way to enjoy the aromatic benefits of essential oils is to breathe them in!',
      longDesc: [
         'The easiest way to enjoy the aromatic benefits of essential oils is to breathe them in!',
         'Have you ever walked into a spa and reveled in the aroma of Tea Tree and Eucalyptus essential oils? Or perhaps you have felt the calm of the aroma of Lavender oil? All that is required is to place a few drops of essential oil in the palms of your hands. Then cup your hands lightly over your mouth and nose and inhale, taking a deep breath for as long as necessary.',
         'You could also use an essential oil diffuser to fill your home or office with your favorite scents, or add a few drops of your favorite essential oils to a cotton ball and place it where you want the scent to disperse.',
      ],
      image: '../../assets/images/aromatico.jpg',
   },
   {
      card: false,
      icon: 'pi pi-thumbs-up text-yellow-600',
      iconBgColor: 'bg-yellow-100',
      title: 'Topical',
      dialogTitle: 'A few drops on the skin.',
      shortDesc:
         'A few drops on the skin. The topical use of essential oils is one of the most popular.',
      longDesc: [
         'The topical use of essential oils is one of the most popular. Typically, figuring out how to use essential oils on the skin is what turns people from casual users to essential oil devotees.',
         'These can help improve the appearance of healthy skin and make a relaxing massage extra smooth or add more energy to an already invigorating one.',
         "To use Young Living essential oils, you can enjoy a wide variety of benefits by applying them, especially on the nape of the neck, behind the ears, on your neck, temples, and on the soles of your feet. Similarly, if the scent of an oil is too strong or your skin is sensitive, you can dilute it with a carrier oil like Young Living's V-6™ Essential Oil Complex.",
      ],
      image: '../../assets/images/topico.jpg',
   },
   {
      card: false,
      icon: 'pi pi-apple text-purple-600',
      iconBgColor: 'bg-purple-100',
      title: 'Internal',
      dialogTitle: 'One with your body.',
      shortDesc:
         'One with your body. Did you know that you can get the benefits of essential oils by ingesting them?',
      longDesc: [
         'Did you know that you can get the benefits of essential oils by ingesting them?',
         "Young Living's Vitality™ line was developed to provide a clear distinction between oils for internal use and those for topical and aromatic use.",
         "They all provide the same pure, authentic essential oils; we've just labeled them differently so there's no confusion!",
      ],
      image: '../../assets/images/interno.jpg',
   },
];

/* 
export interface BenefitsData {
   card: boolean;
   icon: string;
   iconBgColor: string;
   title: string;
   dialogTitle: string;
   shortDesc: string;
   longDesc: string[];
   image: string;
}

export interface DialogType {
   header: string;
   title: string;
   desc: string[];
   img: string;
}

export const benefitsData = [
   {
      card: false,
      icon: 'pi pi-cloud text-green-600',
      iconBgColor: 'bg-green-100',
      title: 'Aromático',
      dialogTitle: 'Respirarlo.',
      shortDesc:
         '¡La manera más sencilla de disfrutar los beneficios aromáticos de los aceites esenciales es respirándolos!',
      longDesc: [
         '¡La manera más sencilla de disfrutar los beneficios aromáticos de los aceites esenciales es respirándolos!',
         '¿Alguna vez has caminado dentro de un spa y te has deleitado con el aroma de los aceites esenciales de Árbol de Té y Eucalipto? ¿O quizás has sentido la calma del aroma del aceite de Lavanda? Todo lo que se requiere es colocar algunas gotas de aceite esencial en las palmas de tus manos. Enseguida coloca tus manos en forma ahuecada ligeramente sobre tu boca y nariz e inhala, respira profundamente durante el tiempo que sea necesario.',
         'También podrías usar un difusor para aceites esenciales para llenar tu hogar u oficina con tus aromas favoritos o agregar algunas gotas de tus aceites esenciales favoritos en una bolita de algodón y colocarlas en donde desees que se disperse el aroma.',
      ],
      image: '../../assets/images/aromatico.jpg',
   },
   {
      card: false,
      icon: 'pi pi-thumbs-up text-yellow-600',
      iconBgColor: 'bg-yellow-100',
      title: 'Tópico',
      dialogTitle: 'Unas gotas en la piel.',
      shortDesc:
         'Unas gotas en la piel. El uso tópico de los aceites esenciales es uno de los más populares.',
      longDesc: [
         'El uso tópico de los aceites esenciales es uno de los más populares. Generalmente, descubrir cómo usar los aceites esenciales en la piel es lo que convierte a las personas de usuarios casuales a devotos de los aceites esenciales.',
         'Éstos pueden ayudar a mejorar la apariencia de una piel saludable y hacer que un masaje relajante se vuelva extra suave o bien agregar más energía a uno ya vigorizante.',
         'Para usar aceites esenciales de Young Living, puedes disfrutar de una gran variedad de beneficios aplicándolos, especialmente, en tu nuca, detrás de las orejas, en tu cuello, sienes y en las plantas de los pies. De igual manera, si el aroma de un aceite es demasiado fuerte o tu piel es sensible, puedes diluirlo con aceite portador como el Complejo de Aceites Esenciales V-6™ de Young Living.',
      ],
      image: '../../assets/images/topico.jpg',
   },
   {
      card: false,
      icon: 'pi pi-apple text-purple-600',
      iconBgColor: 'bg-purple-100',
      title: 'Interno',
      dialogTitle: 'Uno con tu cuerpo.',
      shortDesc:
         'Uno con tu cuerpo. ¿Sabías que puedes obtener los beneficios de los aceites esenciales ingiriéndolos?',
      longDesc: [
         '¿Sabías que puedes obtener los beneficios de los aceites esenciales ingiriéndolos?',
         'La línea Vitality™ de Young Living fue desarrollada para brindar una clara distinción entre los aceites de uso interno y aquellos de uso tópico y aromático.',
         'Todos proporcionan los mismos aceites esenciales puros y auténticos; ¡solo que los hemos etiquetado de manera diferente para que no haya confusión!',
      ],
      image: '../../assets/images/interno.jpg',
   },
];

*/
