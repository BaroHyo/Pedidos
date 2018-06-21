import { Injectable } from '@angular/core';
import { Api } from './../api/api';
@Injectable()
export class PedidoServicio {
  body = {};
  constructor(public api: Api) {

  }
  listarPedidos(estado : number, sucursal : number,usuarioAsignado:number){
    let promesa = new Promise( (resolve, reject)=>{
      const param = this.body = {
        estadoID: estado,
        sucursalID: sucursal,
        usuarioAsignado:usuarioAsignado
       }
        this.api.post('ListarPedidos', JSON.stringify(param)).subscribe( data =>{
           resolve(data);
      })
      }).catch( error=> console.log( "Error en promesa Service: " + JSON.stringify(error) ) );
      return promesa;
  }
  
  contarPedido(estadoID : number , sucursalID: number,usuarioAsignado:number){

    let promesa = new Promise( (resolve, reject)=>{
      
      
        this.api.get('ContadorPedidos?estadoID='+estadoID+'&sucursalID='+sucursalID+'&usuarioAsignado='+usuarioAsignado).subscribe( data =>{
            var json = JSON.stringify(data) ;
            var obj = JSON.parse(json);
          resolve(obj.contador);
      })
      }).catch( error=> console.log( "Error en promesa Service: " + JSON.stringify(error) ) );
      return promesa;
  }
  aceptarPedido(pedidoID : number , log : any, lat : any,usuarioMod:number){

    let promesa = new Promise( (resolve, reject)=>{
      const param = this.body = {
        /*estadoID: estado,
        usuarioAsignado: usuarioMod,
        latitud: lat,
        longitud: log*/
        usuarioAsignado:usuarioMod,
        latitud:lat, 
        longitud:log,
        pedidoID:pedidoID
       }
        /*this.api.put('Pedidos/'+pedidoID,JSON.stringify(param)).subscribe( data =>{
          const obj = data;
          if(Object.keys(obj).length === 0){
           resolve(false);
         }else{
           resolve(true);
         }
      })*/
      this.api.post('AsignarPedido', JSON.stringify(param)).subscribe( data =>{
        resolve(data);
       })
      
      }).catch( error=> console.log( "Error en promesa Service: " + JSON.stringify(error) ) );
      return promesa;

  }


}
