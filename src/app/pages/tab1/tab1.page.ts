import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseosService:DeseosService,
              private router:Router,
              private alertCtrl:AlertController) {


              }

  async agregarLista(){
    // this.router.navigateByUrl('/tabs/tab1/agregar');//a donde lo movimos

    const alert=await this.alertCtrl.create({  
      header:'Nueva lista',
      inputs:[{
        name:'titulo',
        type:'text',
        placeholder:'Nombre de la lista'
      }],
      buttons:[{
        text:'Cancelar',
        role:'cancel',
        handler:()=>{
          console.log('Cancelar');
        }
      },
      {
        text:'Crear',
        role:'',
        handler:(data)=>{
          console.log(data);
          if(data.titulo.length===0){
            return;
          }
          const listaId=this.deseosService.crearLista(data.titulo);
          this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
        }
      }
    ]
    });

    alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });;

  }

  
            

}
