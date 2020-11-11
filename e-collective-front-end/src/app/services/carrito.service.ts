import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carro = [];
  private contadorItems = new BehaviorSubject(0);
  constructor() { }


  getCarro(){
    return this.carro;
  }

  getContadorItems(){
    return this.contadorItems;
  }

  agregarProducto(producto){
    let agregado = false;
    for (const p of this.carro){
      if (p.$id === producto.$id){
        p.quantity += 1;
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
      if (p.$id === producto.$id){
        p.quantity -= 1;
        if (p.quantity == 0){
          this.carro.splice(index, 1);
        }
      }
    }
    this.contadorItems.next(this.contadorItems.value - 1);
  }

  eliminarProducto(producto){
    for (const [index, p] of this.carro.entries()){
      if (p.$id === producto.$id){
        this.contadorItems.next(this.contadorItems.value - p.quantity);
        this.carro.splice(index, 1);
      }
    }
  }
}
