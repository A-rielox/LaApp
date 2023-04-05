import { Post } from 'src/app/_models/post';

export interface DialogType {
   post: Post;
}

export const postsData: Post[] = [
   {
      category: 'Malestares',
      content:
         '<p>El <strong><u>aceite esencial de Tomillo</u></strong> es muy conocido por sus propiedades antibacterianas, pero también es un poderoso antiviral. De hecho, sus cualidades para matar gérmenes son tan efectivas que encontrarás el aceite esencial de tomillo como principio activo en muchos productos de limpieza ecológicos. En un <strong>estudio publicado en la revista Medicinal Chemistry en el 2011</strong>, los investigadores examinaron la respuesta del aceite de tomillo a 120 cepas de bacterias que fueron aisladas de pacientes con infecciones respiratorias. Los resultados descubrieron que <em>el aceite de tomillo mostró una fuerte actividad contra todas las cepas de bacterias</em>, lo cual significa que el aceite de tomillo es perfecto para los dolores de garganta, la tos y la congestión nasal debido a los resfriados.</p><p>Aceite tomillo, ¿Cómo usar el aceite de tomillo?</p><ul><li>Aplicar tópicamente en el cuello y el pecho</li><li>Tomar 1 ó 2 gotas vía interna</li><li>Añadir de 5 a 7 gotas en agua caliente y respirar el vapor</li></ul><p><br></p><p>Seguridad con el aceite esencial de tomillo:</p><ul><li>No usar durante el embarazo</li><li>Evitar si tienes la presión alta o epilepsia</li></ul>',
      created: new Date('2023-03-28T19:22:05.09964Z'),
      createdById: 6,
      createdByPhotoUrl: 'https://randomuser.me/api/portraits/men/90.jpg',
      createdByUsername: 'todd',
      id: 8,
      title: 'Contra la tos e  infecciones respiratorias',
   },
   {
      category: 'Malestares',
      content:
         '<ul><li>Aceite Esencial de Gaulteria</li><li>Aceite Esencial de Siempreviva</li><li>Aceite Esencial de Eucalipto Azul</li><li>Aceite Esencial de Katrafay</li></ul><p>Es suficiente con mezclar 2 gotas de cada aceite esencial y luego aplicar la sinergia en la zona dolorida 3 veces al día! Qué fácil, ¿verdad? ¡Y muy importante muy natural!</p><p><br></p><h1>¿Qué beneficios nos aportan estos aceites en el tratamiento del dolor de espalda o cualquier otro tipo de dolor?</h1><p><br></p><p><strong>Aceite Esencial de Gaulteria</strong> tiene efectos analgésicos y antiespasmódicos muy recomendado para los deportistas.</p><p><strong>Aceite Esencial de Siempreviva</strong> un aliado perfecto contra cualquier tipo de traumatismo, por sus propiedades antihematoma y antiinflamatorias.</p><p><strong>Aceite Esencial de Eucalipto Azu</strong>l es añadido a esta receta por sus beneficios calmantes a nivel cutáneo, antiinflamatorios y analgésicos.</p><p><strong>Aceite Esencial de Katrafay</strong> otro aceite que potencia el efecto de esta sinergia gracias a sus efectos descongestionantes, antiinflamatorios y analgésicos.&nbsp;</p><p><br></p><p>¡Espero que te haya gustado y que hayas aprendido algo nuevo! ¡Que tengas un buen fin de semana, que descanses pero ¡sin dolor, claro!</p><p><br></p><p><em>¡No olvides de informarte sobre las posibles contraindicaciones de los aceites, que mencionamos! Puedes encontrar más información en nuestra web.</em></p>',
      created: new Date('2022-05-01T19:09:40.7453596Z'),
      createdById: 6,
      createdByPhotoUrl: 'https://randomuser.me/api/portraits/men/90.jpg',
      createdByUsername: 'todd',
      id: 7,
      title: 'Para tu dolor de espalda',
   },
   {
      category: 'Salud',
      content:
         '<ul><li>Aceite Vegetal de Árnica (30 ml)</li><li>Aceite Esencial de Siempreviva (20 gotas)</li><li>Aceite Esencial de Ylang-Ylang (5 gotas)</li></ul><p>Masajea suavemente la zona del golpe, moretón o el chipote con esta fórmula varias veces al día hasta notar la mejora.</p><p><br></p><h2>¿Y por qué te recomiendo usar estos aceites para tratar los chipotes y golpes?</h2><p><br></p><p><strong>Aceite Vegetal de Árnica</strong> es un aceite antiinflamatorio, perfecto en caso de que tengas contusiones, dolor o agujetas después del gym.</p><p><strong>Aceite Esencial de Siempreviv</strong>a ¡me encanta! por tener tantísimas propiedades entre las que más se destacan su efecto anti-hematoma, por lo que es muy utilizado para tratar los chipotes, hematomas, moretones, golpes tanto recientes, como antiguos sean internos o externos.</p><p><strong>Aceite Esencial de Ylang-Ylang</strong> es un antiinflamatorio y tónico cutáneo con un efecto relajante y calmante para el sistema nervioso.</p><p>Por hoy es todo, ya me quedo más tranquila porque ahora en tu poder tienes un remedio para poder enfrentarte a los porrazos, cardenales y chipotes de tus niños. Y la semana que viene más y mejor.</p><p><br></p><p>¡Piensa en verde!</p><p><br></p><p><em>¡No olvides de informarte sobre las posibles contraindicaciones de los aceites, que mencionamos! Puedes encontrar más información en nuestra web.</em></p>',
      created: new Date('2021-03-20T18:57:48.5573259Z'),
      createdById: 4,
      createdByPhotoUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
      createdByUsername: 'lois',
      id: 6,
      title: 'Para tratar tus chipotes',
   },
];