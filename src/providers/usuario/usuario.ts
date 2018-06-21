import { Api } from './../api/api';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from "ionic-angular";
@Injectable()
export class UsuarioServicio {
  body:{};
  usuarioID:any;
  sucursalID:any;
  codigo:string;
  estado:string; 
  constructor(private api: Api,
              private storage:Storage,
              private platform:Platform) {

  }
  InicarSeccion(clave:string){  
    clave = clave.toUpperCase();
    let promesa = new Promise( (resolve, reject)=>{
    const param = this.body = {
      codigo:clave
     }
      this.api.post('IniciarSesion', JSON.stringify(param)).subscribe( data =>{
         const obj = data;
         if(Object.keys(obj).length === 0){
          resolve(false);
        }else{
          this.usuarioID = obj[0].usuarioID;
          this.sucursalID = obj[0].sucursalID;
          this.codigo = clave;
          this.estado = obj[0].estado;
          this.guardar_storage();
          resolve(true);
        }
    })
    }).catch( error=> console.log( "Error en promesa Service: " + JSON.stringify(error) ) );
    return promesa;
  }
  guardar_storage(){

    let promesa = new Promise( ( resolve, reject )=>{

      if(  this.platform.is("cordova")  ){
        // dispositivo
        this.storage.set('clave', this.codigo );
        this.storage.set('usuarioID', this.usuarioID );
        this.storage.set('sucursalID', this.sucursalID );
        this.storage.set('estado', this.estado );

      }else{
        // escritorio
        console.log("Clave en guardar storage " , this.codigo);
        if( this.codigo ){
          localStorage.setItem("clave", this.codigo);
          localStorage.setItem("usuarioID", this.usuarioID );
          localStorage.setItem('sucursalID', this.sucursalID );
          localStorage.setItem('estado', this.estado );
        }else{
          localStorage.removeItem("clave");
          console.log("Clave borrada");
        }
        console.log("Clave LocalStorage? ", this.codigo,this.usuarioID,this.sucursalID,this.estado);
      }
    });

    return promesa;

  }
  cargar_storage(){
    let promesa = new Promise( (resolve,reject)=>{
      if( this.platform.is("cordova") ){
        // dispositivo
        this.storage.ready()
            .then( ()=>{
              // leer del storage
              this.storage.get("clave").then( clave=>{
                this.codigo = clave;
                resolve();
              });
              this.storage.get("usuarioID").then( usuarioID=>{
                this.usuarioID = usuarioID;
                resolve();
              });
              this.storage.get("sucursalID").then( sucursalID=>{
                this.sucursalID = sucursalID;
                resolve();
              });
              this.storage.get("estado").then( estado=>{
                this.estado = estado;
                resolve();
              });
            });
      }else{
        // escritorio
        this.usuarioID =  localStorage.getItem("usuarioID")
        this.sucursalID = localStorage.getItem("sucursalID");
        this.codigo = localStorage.getItem("clave");
        this.estado = localStorage.getItem("estado");
        resolve();
      }
    });
    return promesa;
  }
  borrar_usuario(){
    this.usuarioID = null;
    this.sucursalID = null;
    this.codigo = null;
    this.estado = null;
    this.guardar_storage();
  }

}
