import { ProductsService } from './../services/products/products.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Product } from '../models/product/product';
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
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) { }
  producto: Product;
  usuario: User;
  respuesta = '';
  pregunta = '';
  carro = [];
  contadorItems: BehaviorSubject <number>;
  fecha: string = this.getFechaCreado();


  questions: Question[] = [  ];


  ngOnInit() {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state) {
      this.producto = state.producto;
      this.usuario = state.usuario;
      // console.log(this.usuario);
    }

    this.carro = this.carritoServicio.getCarro();
    this.contadorItems = this.carritoServicio.getContadorItems();

    this.productService.getQuestions(this.producto.id).subscribe(products=>{
      this.questions=products;
      this.questions.forEach(question => {
        this.productService.getAnswers(question.id).subscribe(answers =>
          question.answers = answers
          )
      });
    });
    

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

  async presentAlertLogin() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Debe iniciar sesión',
      message: 'Es necesario registrarse/iniciar sesión para escribir preguntas o respuestas.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Se canceló la operación.');
          }
        }, {
          text: 'Iniciar sesión',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });


    await alert.present();
  }

  createAnswer(question: Question) {
    if(this.usuario === undefined) {
      this.presentAlertLogin();
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
      this.productService.insertAnswer(answer);
    }

  }

  createQuestion() {
    if (this.usuario === undefined) {
      this.presentAlertLogin();
    } else {
      console.log(this.usuario.name);
      const question: Question = {
        id: '',
        idProduct: this.producto.id,
        user: this.usuario,
        time: this.getFechaCreado(),
        question: this.pregunta,
        answers: []
      };
      this.questions.push(question);
      this.pregunta = '';
      this.productService.insertQuestion(question);
    }
  }

  async abrirCarrito(){
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      componentProps: { usuario: this.usuario }
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
