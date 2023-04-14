export interface text {
   list: string;
   listPlaceholder: string;
   category: string;
   categoryPlaceholder: string;
   selection: string;
   titleField: string;
   titleFieldErrorMsg: string;
   descField: string;
   descFieldErrorMsg: string;
   btn: string;

   requiredField: string;
}
export const textEsp = {
   list: 'Lista de Aceites',
   listPlaceholder: 'Selecciona los aceites',
   category: 'Categoría',
   categoryPlaceholder: 'Selecciona una Categoria',
   selection: 'Tu selección de aceites',
   titleField: 'Título',
   titleFieldErrorMsg:
      'Este campo es requerido, con un mínimo de 5 y máx de 30 caracteres.',
   descField: 'Descripción',
   descFieldErrorMsg:
      'Este campo es requerido, con un mínimo de 30 y máx de 1000 caracteres.',
   btn: 'Guardar',

   requiredField: 'Este campo es requerido',
};
export const textEng = {
   list: 'List of Oils',
   listPlaceholder: 'Select the oils',
   category: 'Category',
   categoryPlaceholder: 'Select a category',
   selection: 'Your selection of oils',
   titleField: 'Title',
   titleFieldErrorMsg:
      'This field is required, with a minimum of 5 and a maximum of 30 characters.',
   descField: 'Description',
   descFieldErrorMsg:
      'This field is required, with a minimum of 30 and a maximum of 1000 characters.',
   btn: 'Save',

   requiredField: 'This field is required',
};
