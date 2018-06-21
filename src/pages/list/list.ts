import { UsuarioServicio } from './../../providers/usuario/usuario';
import { GeolocalizacionServicio } from './../../providers/geolocalizacion/geolocalizacion';
import { EntregaSevicio } from './../../providers/entrega/entrega';
import { PedidoServicio } from './../../providers/pedido/pedido';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  pedidosList : any;
  private countEntrega: any ;
  private count: any ;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private pedidoServicio:PedidoServicio,
              private entregaSevicio:EntregaSevicio,
              private geolocalizacionServicio:GeolocalizacionServicio,
              private us : UsuarioServicio,
              public events: Events,
              private loadingCtrl: LoadingController,
            ) {
            
            this.doRefresh(0);  
            
  }
  ionViewDidEnter(){
    console.log(' load segunda');
    this.doRefresh(0);  
  }
  doRefresh(refresher) {
    this.listar();
    this.updateTabBadgeEntrega();
    this.updateTabBadge();
   if(refresher != 0)
   // setTimeout(() => {
      refresher.complete();
   // }, 1000);
  }
  listar() {
    this.us.cargar_storage().then( ()=>{
      ///  entrega estado = 2
    this.pedidoServicio.listarPedidos(2,this.us.sucursalID,this.us.usuarioID)
    .then(data => {
      this.pedidosList = data;
    })

  });
  }

  accion(pedidoID: number) {
    let loading = this.loadingCtrl.create({
      content: "Espere por favor..."
    });
    loading.present();

    const confirm = this.alertCtrl.create({
      title: 'Selecione una accion',
     // message: '',
      buttons: [
        {
          text: 'Entregar Pedido',
          handler: () => {
            
            this.geolocalizacionServicio.get().then((data)=>{
              var posicion = data.coords;
              this.entregaSevicio.entregar(pedidoID,posicion.latitude,posicion.longitude).then(respuesta=>{
                loading.dismiss();
                if(respuesta){
                  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                  this.updateTabBadgeEntrega();
                  this.updateTabBadge();
               }
              });
            }).catch((error)=>console.error(error));
          }
        },
        {
          text: 'Rechazar Pedido',
          handler: () => {
            //estado borrado = 1
            this.pedidoServicio.aceptarPedido(pedidoID,null,null,null).then(data => {
              console.log(data);
              loading.dismiss()
              if(data){
                 this.navCtrl.setRoot(this.navCtrl.getActive().component);
                 this.updateTabBadgeEntrega();
                 this.updateTabBadge();
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }
  public updateTabBadge(): void {
    //1 = pedido
   this.us.cargar_storage().then( ()=>{
   this.pedidoServicio.contarPedido(1,this.us.sucursalID,0) .then(value => {
   this.events.publish('cart:updated',this.count=value);})
   });
 }
  public updateTabBadgeEntrega(): void {
     //2 = entrega
    this.us.cargar_storage().then( ()=>{
    this.pedidoServicio.contarPedido(2,this.us.sucursalID,this.us.usuarioID) .then(value => {
    this.events.publish('cartEntrega:updated',this.countEntrega=value);})
    });
  }
}
