import { Product } from 'src/app/models/product/product';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../question/question.model';
import { User } from '../models/user/user';
import * as moment from 'moment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  constructor(private router: Router) { }
  producto: Product;
  usuario: User;
  respuesta: string;


  /*questions: Question[] = [
    {id: '23423',
    user: {email: 'f@gmail.com',
    name: 'Francisco Pereira',
    password: '2323',
    birthdate: '2323',
    imageData: '',
    uid: '223'},
    question: '¿Qué tal la calidad de este celulars?',
    time: 0,

    answers: [
      {id: '23423',
      questionId: '234234',
      user: {email: 'f@gmail.com',
      name: 'Francisco Pereira',
      password: '2323',
      birthdate: '2323',
      imageData: '',
      uid: '223'},
      answer: 'Pues bastante bien si te soy honesto.',
      time: 0},
      {id: '23423',
      questionId: '234234',
      user: {email: 'f@gmail.com',
      name: 'Francisco Pereira',
      password: '2323',
      birthdate: '2323',
      imageData: '',
      uid: '223'},
      answer: 'Me gusta.',
      time: 0},
      {id: '23423',
      questionId: '234234',
      user: {email: 'f@gmail.com',
      name: 'Francisco Pereira',
      password: '2323',
      birthdate: '2323',
      imageData: '',
      uid: '223'},
      answer: 'Una cagada.',
      time: 0}
    ]
    }
  ];
*/

  ngOnInit() {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state) {
      this.producto = state.producto;
      this.usuario = state.usuario;
      console.log(this.usuario);
    }
    this.getFechaAsignado();


  }

  createComment() {}




  formatDate(date) {
    if (date !== undefined && date !== '') {
      const myDate = new Date(date);
      const month = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'][myDate.getMonth()];
      const str = myDate.getDate() + ' ' + month + ' ' + myDate.getFullYear() + myDate.getHours + myDate.getMinutes;
      return str;
    }
    return '';
  }

  // Obtiene el día actual con formato deseado
  getFechaAsignado() {
    const a = moment();
    a.format('dddd, MMMM Do YYYY, h:mm:ss a'); // "Sunday, February 14th 2010, 3:25:50 pm"
    const aa = a.toString;
    console.log(a);
    console.log(typeof a);
    console.log(aa);
  }

}
