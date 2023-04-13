export interface text {
   title: string;
   subTitle: string;
   titleFilters: string;
}

export interface Sorting {
   name: string;
   label: string;
}

export const sortingOptsEsp = [
   { name: 'lastActive', label: 'Más reciente' },
   { name: 'a-z', label: 'Nombre a-z' },
];
export const sortingOptsEng = [
   { name: 'lastActive', label: 'More recent' },
   { name: 'a-z', label: 'Name a-z' },
];

export const textEsp = {
   title: 'El Equipo',
   subTitle:
      'Todos comprometidos con mejorar nuestro estilo de vida de una forma sana y natural.',
   titleFilters: 'Ordenar por',
};

export const textEng = {
   title: 'The team',
   subTitle:
      'Everyone committed to improving our lifestyle in a healthy and natural way.',
   titleFilters: 'Sort by',
};
