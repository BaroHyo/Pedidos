import { Component } from '@angular/core';
import { Pedidos, ListPage } from '../index';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  public cartCountPedidos: any;
  public cartCountEntrega: any;
  tabla1: any = Pedidos;
  tabla2: any = ListPage;
 
  tabla1contador : any ;
  tabla2contador: any;
  constructor(public events:Events ) {
   this.events.subscribe('cart:updated', (count) => {
    this.cartCountPedidos = count;
  });
  this.events.subscribe('cartEntrega:updated', (countEntrega) => {
    this.cartCountEntrega = countEntrega;
  });
  }
 
}
