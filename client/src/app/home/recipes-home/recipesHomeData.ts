import { Recipe } from 'src/app/_models/recipe';

export interface DialogType {
   recipe: Recipe;
}

export const recipesData: Recipe[] = [
   {
      category: 'Malestares',
      content:
         'El aceite esencial de Jengibre también es muy útil durante las épocas de más frío, gracias especialmente a sus propiedades de limpieza de mocos.  El aceite de jengibre alivia las incomodidades por la congestión e infección nasal. Ayuda a aclarar y limpiar la mucosidad en la garganta y pulmones. ¿Cómo usar el aceite de jengibre?    – Añadir una gota del aceite esencial a una taza de te, hasta 2 veces al día.    – Aplicar tópicamente en el pecho. Si tienes la piel un poco sensible, usar una base de aceite vegetal, como puedas ser el aceite de almendras.',
      created: new Date('2023-03-28T19:27:12.6645649Z'),
      createdById: 1,
      createdByPhotoUrl:
         'https://res.cloudinary.com/dxrrk3nvu/image/upload/v1679868007/LaApp/ylgkq71ylvshmmcwpa1h.webp',
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
      createdByPhotoUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
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
      createdByPhotoUrl: 'https://randomuser.me/api/portraits/men/87.jpg',
      createdByUsername: 'porter',
      id: 14,
      oilsList: 'Lavanda,Naranja',
      title: 'Relajación',
   },
];
