export interface text {
   category: string;
   categoryPlaceholder: string;

   titleField: string;
   titleFieldErrorMsg: string;

   descField: string;
   descFieldErrorMsg: string;

   btn: string;

   requiredField: string;

   postSummary: string;
   postAdded: string;
   postEdited: string;
}
export const textEsp = {
   category: 'Categoría',
   categoryPlaceholder: 'Selecciona una Categoria',

   titleField: 'Título',
   titleFieldErrorMsg:
      'Este campo es requerido, con un mínimo de 5 y máx de 50 caracteres.',

   descField: 'Descripción',
   descFieldErrorMsg:
      'Este campo es requerido, con un mínimo de 30 y máx de 2000 caracteres.',

   btn: 'Guardar',

   requiredField: 'Este campo es requerido',

   postSummary: 'Listo.',
   postAdded: 'Post añadido.',
   postEdited: 'Post editado.',
};
export const textEng = {
   category: 'Category',
   categoryPlaceholder: 'Select a category',

   titleField: 'Title',
   titleFieldErrorMsg:
      'This field is required, with a minimum of 5 and a maximum of 50 characters.',

   descField: 'Description',
   descFieldErrorMsg:
      'This field is required, with a minimum of 30 and a maximum of 2000 characters.',

   btn: 'Save',

   requiredField: 'This field is required',

   postSummary: 'Ready.',
   postAdded: 'Post added.',
   postEdited: 'Post Edited.',
};
