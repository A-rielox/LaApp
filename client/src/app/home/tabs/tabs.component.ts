import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-tabs',
   templateUrl: './tabs.component.html',
   styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {
   // activeTab1 = 0;

   plans = [
      {
         icon: 'pi pi-bolt',
         name: 'Mejorar Tu Bienestar Físico',
         price: 23,
         description: [
            'Los estilos de vida modernos no siempre favorecen las condiciones óptimas para el bienestar físico. Una dieta deficiente, la falta de ejercicio y una saturación de tóxicos ambientales pueden dejar el cuerpo desequilibrado y disminuir los niveles de energía.',
            'Desde el control del peso hasta el soporte de suplementos, nuestros aceites esenciales y productos enriquecidos con aceites esenciales pueden proporcionar las soluciones específicas que necesitas para restablecer el equilibrio y sentirte mejor.',
         ],
      },
      {
         icon: 'pi pi-home',
         name: 'Purificar tu hogar',
         price: 23,
         description: [
            'Los productos que usamos en nuestros hogares impactan nuestra salud y bienestar. El compromiso de Young Living con los productos a base de plantas de origen natural facilita la elección de limpiadores, productos para el cuidado personal y otros artículos para el hogar formulados sin el uso de químicos dañinos que se encuentran en muchos productos tradicionales.',
            'Nos apasiona usar solo los mejores ingredientes que son buenos para la salud y responsables con el medio ambiente, y a la misma vez efectivos.',
         ],
      },
      {
         icon: 'pi pi-heart',
         name: 'Realzar tu rutina de belleza',
         price: 23,
         description: [
            'Elimina los ingredientes agresivos de tus productos de cuidado personal y deja que tu belleza brille. ¡Te enamorarás de la amplia gama de aceites esenciales que ayudan a mantener la piel con un aspecto claro, aumentan la hidratación y te dan ese brillo juvenil! ¡Los aceites esenciales incluso pueden ayudar a que tu cabello se vea fabuloso!',
            'Utilizando ingredientes de origen natural, nuestras soluciones avanzadas para el cuidado de la piel y el cabello facilitan el disfrute de los hermosos beneficios de los aceites esenciales todos los días.',
         ],
      },
   ];

   selectedPlan = this.plans[0];

   constructor() {}

   ngOnInit(): void {}
}
