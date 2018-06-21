import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { Pedidos } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
// Plugins
import { Geolocation } from '@ionic-native/geolocation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Api } from '../providers/api/api';
import { UsuarioServicio } from '../providers/usuario/usuario';
import { GeolocalizacionServicio } from '../providers/geolocalizacion/geolocalizacion';
import { HttpClientModule } from '@angular/common/http';
import { PedidoServicio } from '../providers/pedido/pedido';
import { EntregaSevicio } from '../providers/entrega/entrega';
import { IonicStorageModule } from '@ionic/storage';
//pages
import { TabsPage } from './../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';


@NgModule({
  declarations: [
    MyApp,
    Pedidos,
    ListPage,
    LoginPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Pedidos,
    ListPage,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Api,
    UsuarioServicio,
    Geolocation,
    GeolocalizacionServicio,
    PedidoServicio,
    EntregaSevicio
  ]
})
export class AppModule {}
