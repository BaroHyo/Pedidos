import { Api } from './../api/api';
import { Injectable } from '@angular/core';
@Injectable()
export class EntregaSevicio {
  body:{};
  constructor(public api: Api) {
  }
  entregar(pedidoID:number , lat : any, log : any){
    let promesa = new Promise( (resolve)=>{
      const param = this.body = {
         pedidoID : pedidoID,
         latitud : lat, 
         longitud : log
       }
        this.api.post('EntregarPedido',JSON.stringify(param)).subscribe( data =>{
           resolve(data);
      })
      }).catch( error=> console.log( "Error en promesa Service: " + JSON.stringify(error) ) );
      return promesa;
  }
}
