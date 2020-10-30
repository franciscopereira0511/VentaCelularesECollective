import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FAQPage implements OnInit {
  explicacionControles = `Agregar controles te permite crear estadísticas para la asignación. Esta característica funciona de la siguiente manera:
   1. Agregas un grupo de controles, como los temas evaluados en la asignación, las preguntas en que se divide, u otros criterios que utilizarás para evaluarla
  2. Al calificar la asignación para cada estudiante, podrás hacerlo estableciendo los puntos obtenidos en cada control. 
  3. El sistema genera estadísticas que permiten dar una mejor retroalimentación a tus estudiantes con respecto a su desempeño en la asignación. (Ver pantalla de estadísticas)`;
  
  preguntas: any[] = [
    {pregunta: '1. ¿Cómo puedo contactar a la empresa?',
    respuesta: `Los medios para contactar a la empresa son los siguientes:

 Teléfonos: +(506) 2573-8634 / +(506) 2572-0008
 Correo electrónico: info@fortech.cr`
  },
    {pregunta: '2. ¿Tienen garantía los teléfonos que venden?',
    respuesta: `La garantía de todos los dispositivos a la venta es de 3 meses desde el día de la entrega. Cualquier defecto funcional será reparado en caso que exista. Los defectos estéticos no aplican en la garantía, pues nuestro sistema de categorización de las condiciones del dispositivo toman en cuenta aspectos de este tipo a la hora de establecer un precio.

    Cualquier reclamo será atentido por uno de nuestros operadores 72 horas hábiles después de haber sido procesado.`},
    {pregunta: '3. ¿Cómo definen las categorías de condición de un teléfono?', 
    respuesta: `Realizamos un diagnóstico completo y un control visual en todos nuestros teléfonos y tabletas. Cada uno se evalúa individualmente y se le asigna una calificación basada únicamente en su apariencia física. Las calificaciones se explican a continuación:

    Nuevo en caja: un producto en caja "como nuevo" que viene en su empaque original. No mostrará signos de uso y estará en perfecto estado de funcionamiento.

    Como nuevo: un producto premium que está "como nuevo" por una fracción del precio, este producto no tendrá signos de uso y se empaquetará en nuestra caja E-collective.

    Restaurado excelente: un producto premium que tiene leves signos de uso y está en excelente estado de funcionamiento.

    Restaurado muy bueno: un producto en muy buen estado que tiene desgaste aislado en el frente, la parte posterior o los lados. Este producto es completamente funcional.

    Restaurado con defectos visibles: un producto en estado promedio que tiene signos de uso. Tendrá desgaste en la parte delantera, trasera o laterales. Podría tener algún defecto funcional leve que no afecta el uso general. 

    Todos nuestros productos han sido probados por un especialista en dispositivos electrónicos y su calidad se verificó antes de ser enviados.`},
    {pregunta: '4. ¿Qué hago si tengo dispositivos electrónicos electrónicos que necesito reciclar?', 
    respuesta: `La empresa Fortech S.A. encargada de la franquicia E-collective ofrece servicios de reciclaje de electrónicos.
    Puede ponerse en contacto con la empresa por medio de alguno de los canales de comunicación enlistados en la pregunta 1 de esta página.`},
    {pregunta: '5. ¿Qué pasa con los dispositivos que reciben para reciclaje?',
    respuesta: `Los dispositivos recibidos para reciclaje reciben una evaluación inicial que determina si pueden ser restaurados o no. En caso que puedan ser restaurados, usted podrá recibir un monto canjeable por uno de los dispositivos de nuestra tienda o un pago en efectivo. De lo contrario, el dispositivo será reciclado responsablemente asegurando un ciclo de vida sostenible, amigable para el medio ambiente.

    Ambas operaciones implican que toda información personal que el dispositivo contenga será eliminada completamente.`
  }
  ];

  


  constructor() { }

  ngOnInit() {
  }

}
