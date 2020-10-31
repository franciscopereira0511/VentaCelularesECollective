import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Producto {
  id: number;
  nombre: string;
  precio:number;
  cantidad: number;
  imgUrl: string; 
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  data: Producto[] = [
    {id: 0, nombre: 'Huawei Y9',precio:150000,cantidad:1,imgUrl:"https://j2m3x7c3.stackpathcdn.com/wp-content/uploads/2019/07/Huawei-Y9-Prime-2019-en-Costa-Rica.jpg"},
    {id: 1, nombre: 'Xiaomi Mi 9',precio:125000,cantidad:1,imgUrl:"https://i.blogs.es/3b8ed2/cc9/1366_2000.jpg"},
    {id: 2, nombre: 'Iphone 12',precio:500000,cantidad:1,imgUrl:"https://img.phonandroid.com/2020/09/iphone-12-keynote-apple.jpg"},
    {id: 3, nombre: 'Sony Xperia I',precio:100000,cantidad:1,imgUrl:"https://phonesdata.com/files/models/Sony--Xperia-1-896.jpg"},
    {id: 4, nombre: 'Huawei Y9',precio:150000,cantidad:1,imgUrl:"https://j2m3x7c3.stackpathcdn.com/wp-content/uploads/2019/07/Huawei-Y9-Prime-2019-en-Costa-Rica.jpg"},
    {id: 5, nombre: 'Xiaomi Mi 9',precio:125000,cantidad:1,imgUrl:"https://i.blogs.es/3b8ed2/cc9/1366_2000.jpg"},
    {id: 6, nombre: 'Iphone 12',precio:500000,cantidad:1,imgUrl:"https://img.phonandroid.com/2020/09/iphone-12-keynote-apple.jpg"},
    {id: 7, nombre: 'Sony Xperia I',precio:100000,cantidad:1,imgUrl:"https://phonesdata.com/files/models/Sony--Xperia-1-896.jpg"}

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
