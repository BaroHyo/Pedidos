import { UsuarioServicio } from './../providers/usuario/usuario';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from './../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any ;
  public pages :Array<{titulo: string, component?: any, icon: string}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private us : UsuarioServicio) {
              
      this.us.cargar_storage().then( ()=>{
        if(this.us.codigo) {
          this.rootPage = TabsPage
        }else{
           this.rootPage = LoginPage;
        }
        platform.ready().then(() => {
          statusBar.styleDefault();
          splashScreen.hide();
        });
        this.pages = [
          {titulo: 'Pedidos', component: TabsPage, icon: 'archive'}
       //   {titulo: 'Perfil', component: LoginPage, icon: 'person' }
        ];
      })
  }

  goToPage(page){
    this.nav.setRoot(page);
  }
  cerrar(){
    this.us.borrar_usuario();
    this.nav.setRoot(LoginPage);
  }
}
