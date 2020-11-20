import { ProductsService } from './../services/products/products.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Product } from 'src/app/models/product/product';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Answer, Question } from '../question/question.model';
import { User } from '../models/user/user';
import * as moment from 'moment';
import { CarritoService } from '../services/carrito.service';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  constructor(private router: Router,
              private modalCtrl: ModalController,
              private carritoServicio: CarritoService,
              private productService: ProductsService,
              private toastCtrl: ToastController) { }
  producto: Product;
  usuario: User;
  respuesta = '';
  pregunta = '';
  carro = [];
  contadorItems: BehaviorSubject <number>;
  fecha: string = this.getFechaCreado();


  /*questions: Question[] = [
    {id: '23423',
    user: {email: 'f@gmail.com',
    name: 'Francisco Pereira',
    rol: 1,
    birthdate: '2323',
    imageData: '',
    uid: '223'},
    question: '¿Qué tal la calidad de este celulars?',
    time: this.fecha,

    answers: [
      {id: '23423',
      questionId: '234234',
      user: {email: 'f@gmail.com',
      name: 'Kenner Ortiz',
      rol: 3,
      birthdate: '2323',
      imageData: '',
      uid: '223'},
      answer: 'Pues bastante bien si te soy honesto. Está en perfecto estado.',
      time: this.fecha},
      {id: '23423',
      questionId: '234234',
      user: {email: 'f@gmail.com',
      name: 'Mariano Torres',
      rol: 1,
      birthdate: '2323',
      imageData: '',
      uid: '223'},
      answer: 'Opino que está muy bien. Sin quejas.',
      time: this.fecha},
      {id: '23423',
      questionId: '234234',
      user: {email: 'f@gmail.com',
      name: 'David Mora',
      rol: 1,
      birthdate: '2323',
      imageData: '',
      uid: '223'},
      answer: 'Fatal este producto, le pongo un rotundo 0.',
      time: this.fecha}
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

    this.carro = this.carritoServicio.getCarro();
    this.contadorItems = this.carritoServicio.getContadorItems();
  }

  async showToast(msg: string, pColor: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: pColor,
      position: 'top'
    });
    (await toast).present();
  }

  createAnswer(question: Question) {
    if(this.usuario.name === undefined) {
      this.showToast('Debe iniciar sesión para agregar una respuesta.', 'danger')
    } else {
      const answer: Answer = {
        id: '',
        user: this.usuario,
        answer: this.respuesta,
        time: this.getFechaCreado(),
        questionId: question.id
      };
      question.answers.push(answer);
      this.respuesta = '';
      // this.productService.addAnswer(question);
    }

  }

  createQuestion() {
    if(this.usuario.name === undefined) {
      this.showToast('Debe iniciar sesión para agregar una pregunta.', 'danger')
    } else {
      console.log(this.usuario.name);
      const question: Question = {
        id: '',
        user: this.usuario,
        time: this.getFechaCreado(),
        question: this.pregunta,
        answers: []
      };
      this.questions.push(question);
      this.pregunta = '';
      // this.productService.addQuestion(question);
    }
  }

  async abrirCarrito(){
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      componentProps: { },
      cssClass: 'cart-modal'
    });
    modal.present();
  }

  agregarEnCarrito(producto){
    this.carritoServicio.agregarProducto(producto);
  }

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
  getFechaCreado() {
    const date: string = moment().format('dddd, MMMM Do YYYY, h:mm a');
    return date;
  }

}
