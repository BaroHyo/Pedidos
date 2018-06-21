import { UsuarioServicio } from './../../providers/usuario/usuario';
import { GeolocalizacionServicio } from './../../providers/geolocalizacion/geolocalizacion';
import { PedidoServicio } from './../../providers/pedido/pedido';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Pedidos {
  pedidosList : any;
  private count: any ;
  private countEntrega: any ;
  constructor(public navCtrl: NavController,
              private pedidoServicio:PedidoServicio,
              private geolocalizacionServicio:GeolocalizacionServicio,
              private loadingCtrl: LoadingController,
              private us : UsuarioServicio,
              public events: Events,
              public alertCtrl: AlertController ) {
            this.doRefresh(0);
  }
  ionViewDidEnter(){
    console.log(' load primera');
    this.doRefresh(0);  
  }
  
  doRefresh(refresher) {
    this.listar();
    this.updateTabBadge();
    this.updateTabBadgeEntrega();
    if(refresher != 0)
    //setTimeout(() => {
      refresher.complete();
   // }, 1000);
  }
  listar() {
    this.us.cargar_storage().then( ()=>{
    this.pedidoServicio.listarPedidos(1,this.us.sucursalID,null).then(data => {
      this.pedidosList = data;})
     });
  }
  continuar(pedidoID:number){
    let loading = this.loadingCtrl.create({
      content: "Espere por favor..."
    });
    loading.present();
    this.us.cargar_storage().then( ()=>{
    this.geolocalizacionServicio.get().then((data)=>{
      var posicion = data.coords;
      // estado entrega = 2
      this.pedidoServicio.aceptarPedido(pedidoID,posicion.longitude,posicion.latitude,this.us.usuarioID).then(data => {
        loading.dismiss();
        this.us.cargar_storage().then( ()=>{
          ///  entrega estado = 2
      });
      console.log(data[0]);
        if(data[0]== 'ocupado'){
          this.showAlert()
        }else{
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
            this.updateTabBadge();
            this.updateTabBadgeEntrega();
        }
      });
    }).catch((error)=>console.error(error))

  });
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

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Aviso!',
      subTitle: 'El Pedido seleccionado ya fue tomado',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    this.updateTabBadge();
    this.updateTabBadgeEntrega();
  }

}
