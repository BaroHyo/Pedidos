import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Cuenta } from './cuenta';

@NgModule({
  declarations: [
    Cuenta,
  ],
  imports: [
    IonicPageModule.forChild(Cuenta),
  ],
})
export class CuentaPageModule {}