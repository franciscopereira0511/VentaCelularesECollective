import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Producto {
  id: string;
  nombre: string;
  modelo: string;
  precio: number;
  cantidad: number;
  imgUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  data: Producto[] = [
    {id: '34f3rv', nombre: 'Iphone', modelo: '9', precio: 284000, cantidad: 1, imgUrl: '../../assets/images/Iphone.jpg'},
    {id: 'gtr45d', nombre: 'Samsung', modelo: 'Galaxy 4', precio: 128000, cantidad: 1, imgUrl: '../../assets/images/Samsung.jpg'},
    {id: 'vre3d2', nombre: 'Huaweii', modelo: 'P30', precio: 250000, cantidad: 1, imgUrl: '../../assets/images/Huaweii.jpg'},
    {id: 'grtr2d', nombre: 'Samsung', modelo: 'a5', precio: 194000, cantidad: 1, imgUrl: '../../assets/images/Samsung.jpg'},
    {id: 'gre32e', nombre: 'Iphone', modelo: '9', precio: 288000, cantidad: 1, imgUrl: '../../assets/images/Iphone.jpg'},
    {id: 'ferr3d', nombre: 'Iphone', modelo: '7', precio: 235770, cantidad: 1, imgUrl: '../../assets/images/Iphone.jpg'},
    {id: 'f3r3rg', nombre: 'Huaweii', modelo: 'P40', precio: 345678, cantidad: 1, imgUrl: '../../assets/images/Huaweii.jpg'},
    {id: 'vre34v', nombre: 'Samsung', modelo: 'a7', precio: 232300, cantidad: 1, imgUrl: '../../assets/images/Samsung.jpg'},
    {id: 'fre6hh', nombre: 'Iphone', modelo: 'Galaxy 6', precio: 284900, cantidad: 1, imgUrl: '../../assets/images/Iphone.jpg'}
  ];

  private carro = [];
  private contadorItems = new BehaviorSubject(0);
  constructor() { }

  getProductos(){
    return this.data;
  }

  getCarro(){
    return this.carro;
  }

  getContadorItems(){
    return this.contadorItems;
  }

  agregarProducto(producto){
    let agregado = false;
    for (const p of this.carro){
      if (p.id === producto.id){
        p.cantidad += 1;
        agregado = true;
        break;
      }
    }
    if (!agregado) {
      this.carro.push(producto);
    }
    this.contadorItems.next(this.contadorItems.value + 1);
  }

  decrementarProducto(producto){
    for (const [index, p] of this.carro.entries()){
      if (p.id === producto.id){
        p.cantidad -= 1;
        if (p.cantidad == 0){
          this.carro.splice(index, 1);
        }
      }
    }
    this.contadorItems.next(this.contadorItems.value - 1);
  }

  eliminarProducto(producto){
    for (const [index, p] of this.carro.entries()){
      if (p.id === producto.id){
        this.contadorItems.next(this.contadorItems.value - p.cantidad);
        this.carro.splice(index, 1);
      }
    }
  }
}
