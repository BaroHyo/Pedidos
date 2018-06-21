import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html'
})
export class Cuenta {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
 // private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController) {
  }

  // Attempt to login in through our User service
  doLogin() {
    
  }
}
