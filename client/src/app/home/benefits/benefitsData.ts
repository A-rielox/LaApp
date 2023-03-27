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
