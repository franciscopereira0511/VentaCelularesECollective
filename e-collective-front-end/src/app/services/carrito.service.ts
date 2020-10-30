import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Producto {
  id: number;
  nombre: string;
  precio:number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  data: Producto[] = [
    {id: 0, nombre: 'Huawei Y9',precio:150000,cantidad:1},
    {id: 1, nombre: 'Xiaomi Mi 9',precio:125000,cantidad:1},
    {id: 2, nombre: 'Iphone 13',precio:500000,cantidad:1},
    {id: 3, nombre: 'Alcatel Pro',precio:100000,cantidad:1},
  ];

  private carro = []
  private contadorItems = new BehaviorSubject(0);
  constructor() { }

  getProductos(){
    return this.data;
  }

  getCarro(){
    return this.carro
  }

  getContadorItems(){
    return this.contadorItems
  }

  agregarProducto(producto){
    let agregado = false;
    for (let p of this.carro){
      if(p.id === producto.id){
        p.cantidad += 1;
        agregado = true;
        break;
      }
    }
    if (!agregado) {
      this.carro.push(producto);
    }
    this.contadorItems.next(this.contadorItems.value + 1)
  }

  decrementarProducto(producto){
    for (let [index,p] of this.carro.entries()){
      if(p.id === producto.id){
        p.cantidad -= 1;
        if(p.cantidad == 0){
          this.carro.splice(index,1);
        }
      }
    }
    this.contadorItems.next(this.contadorItems.value -1)
  }

  eliminarProducto(producto){
    for (let [index,p] of this.carro.entries()){
      if(p.id === producto.id){
        this.contadorItems.next(this.contadorItems.value - p.cantidad)
        this.carro.splice(index,1);
      }
    }
  }
}
