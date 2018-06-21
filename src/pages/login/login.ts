import { UsuarioServicio } from './../../providers/usuario/usuario';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  clave:string = "";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menu: MenuController,
              private serviceusuario : UsuarioServicio,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController ) {
  }
  ionViewDidEnter(){
    this.menu.enable(false);
  }
  ionViewWillLeave(){
    this.menu.enable(true);
  }
  doLogin(){
    let loading = this.loadingCtrl.create({
      content: "Espere por favor..."
    });
    loading.present();

    this.serviceusuario.InicarSeccion(this.clave).then(
      valido =>{

        loading.dismiss();

        if( valido ){
          this.navCtrl.setRoot(TabsPage);  
        }else{

          this.alertCtrl.create({
            title: "Clave no es correcta",
            subTitle: "Por favor verifique su clave, o hable con el adminsitrador",
            buttons: ["Ok!"]
          }).present();
        }
      }).catch( error=>{
        loading.dismiss();
        console.log("ERROR en verifica_usuario: " + JSON.stringify( error ));
    })
    
  }
  cuenta() {
    this.navCtrl.push('Cuenta');
  }

}
