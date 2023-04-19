import { Recipe } from 'src/app/_models/recipe';

export interface DialogType {
   recipe: Recipe;
}

//////////////////////

export interface text {
   title: string;
   categories: string;
   cat1: string;
   cat2: string;
   cat3: string;
   listOfOils: string;
}
export const textEsp = {
   title: 'Únete para publicar y acceder a todas nuestras recetas.',
   categories: 'Categorias',
   cat1: 'Salud',
   cat2: 'Malestares',
   cat3: 'Ánimo',
   listOfOils: 'Lista de aceites:',
};
export const textEng = {
   title: 'Join to publish and access all our recipes.',
   categories: 'Categories',
   cat1: 'Health',
   cat2: 'Discomforts',
   cat3: 'Mood',
   listOfOils: 'List of oils:',
};

export const recipesDataEsp: Recipe[] = [
   {
      category: 'Malestares',
      content:
         'El aceite esencial de Jengibre también es muy útil durante las épocas de más frío, gracias especialmente a sus propiedades de limpieza de mocos.  El aceite de jengibre alivia las incomodidades por la congestión e infección nasal. Ayuda a aclarar y limpiar la mucosidad en la garganta y pulmones. ¿Cómo usar el aceite de jengibre?    – Añadir una gota del aceite esencial a una taza de te, hasta 2 veces al día.    – Aplicar tópicamente en el pecho. Si tienes la piel un poco sensible, usar una base de aceite vegetal, como puedas ser el aceite de almendras.',
      created: new Date('2023-03-28T19:27:12.6645649Z'),
      createdById: 1,
      createdByPhotoUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
      createdByUsername: 'lisa',
      id: 13,
      oilsList: 'Jengibre',
      title: 'Alivia las incomodidades por la congestión',
   },
   {
      category: 'Salud',
      content:
         'Una vez que el área se haya congelado, combine una o dos gotas de aceite de Helicriso o Mirra con suficiente aceite de coco fraccionado para cubrir el área magullada. Dependiendo de la gravedad del moreton, puede considerar aplicar calor al área después de 24 horas de aplicación de hielo. Puede utilizar una almohadilla térmica eléctrica, una bolsa de arroz o una botella de agua caliente. Aplique calor en el área 20 minutos a la vez durante el día hasta que el moreton haya sanado.',
      created: new Date('2022-09-15T18:44:45.539599Z'),
      createdById: 4,
      createdByPhotoUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
      createdByUsername: 'lois',
      id: 12,
      oilsList: 'Mirra,Helicriso,Incienso',
      title: 'Cómo aliviar los moretones',
   },
   {
      category: 'Ánimo',
      content:
         'El aceite esencial de Lavanda es el rey de los aceites esenciales, conocido en todo el mundo como un gran calmante, gracias a sus propiedades relajantes y equilibrantes.   Sus propiedades como antiséptico, calmante del sistema nervioso, antiespasmódico y ansiolítico, entre muchas otras, hace que el aceite esencial de Lavanda sea un básico en nuestros hogares, uno de los reyes de la aromaterapia.Aplicación en difusor :    -- Para calmar y relajar durante el día:  Añadir 4-5 gotas a un difusor junto con aceite esencial de lavanda y mandarina.    -- Para refrescar y calmar el sistema nervioso:  Añadir 4-5 gotas a un difusor junto aceite esencial lavanda y naranja.',
      created: new Date('2022-11-08T19:33:04.1132785Z'),
      createdById: 7,
      createdByPhotoUrl: 'https://randomuser.me/api/portraits/men/66.jpg',
      createdByUsername: 'porter',
      id: 14,
      oilsList: 'Lavanda,Naranja',
      title: 'Relajación',
   },
];

export const recipesDataEng: Recipe[] = [
   {
      category: 'Discomforts',
      content:
         'Ginger essential oil is also very useful during colder times, especially thanks to its mucus cleaning properties. Ginger oil relieves discomfort from nasal congestion and infection. Helps clear and clear mucus in the throat and lungs. How to use ginger oil?    – Add a drop of essential oil to a cup of tea, up to 2 times a day.    – Apply topically on the chest. If you have slightly sensitive skin, use a vegetable oil base, such as almond oil.',
      created: new Date('2023-03-28T19:27:12.6645649Z'),
      createdById: 1,
      createdByPhotoUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
      createdByUsername: 'lisa',
      id: 13,
      oilsList: 'Ginger',
      title: 'Relieves discomfort from congestion.',
   },
   {
      category: 'Health',
      content:
         'Once the area is frozen, combine a drop or two of Helichrysum or Myrrh oil with enough Fractionated Coconut Oil to cover the bruised area. Depending on the severity of the bruise, you may consider applying heat to the area after 24 hours of icing. You can use an electric heating pad, a bag of rice, or a hot water bottle. Apply heat to the area for 20 minutes at a time throughout the day until the bruise has healed.',
      created: new Date('2022-09-15T18:44:45.539599Z'),
      createdById: 4,
      createdByPhotoUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
      createdByUsername: 'lois',
      id: 12,
      oilsList: 'Myrrh,Helichrysum,Incense',
      title: 'How to relieve bruises.',
   },
   {
      category: 'Mood',
      content:
         'Lavender essential oil is the king of essential oils, known throughout the world as a great calming, thanks to its relaxing and balancing properties.   Its properties as an antiseptic, calming the nervous system, antispasmodic and anxiolytic, among many others, make Lavender essential oil a staple in our homes, one of the kings of aromatherapy. Diffuser application :    -- To calm and relax during the day: Add 4-5 drops to a diffuser along with lavender and tangerine essential oil.    -- To cool and calm the nervous system:  Add 4-5 drops to a diffuser along with lavender and orange essential oil.',
      created: new Date('2022-11-08T19:33:04.1132785Z'),
      createdById: 7,
      createdByPhotoUrl: 'https://randomuser.me/api/portraits/men/66.jpg',
      createdByUsername: 'porter',
      id: 14,
      oilsList: 'Lavender,Orange',
      title: 'Relaxation',
   },
];
