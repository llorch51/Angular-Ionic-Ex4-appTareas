import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista:Lista;
  nombreItem='';

  constructor(private deseosService:DeseosService,
              private route:ActivatedRoute) {

      const listaId=this.route.snapshot.paramMap.get('listaId');//mismo que en tabs-routing.module
      console.log(listaId);

      this.lista=this.deseosService.obtenerLista(listaId);
      console.log(this.lista);
   }

   agregarItem(){
     if(this.nombreItem.length===0){
       return;
     }

     const nuevoItem=new ListaItem(this.nombreItem);
     this.lista.items.push(nuevoItem);

     this.nombreItem='';
     this.deseosService.guardarStorage();
   }

   cambioCheck(item:ListaItem){
     console.log(item);
     const pendientes=this.lista.items.filter(itemData => !itemData.completado).length;//regresa un arreglo
     console.log({pendientes});

     if(pendientes===0){
       this.lista.terminadaEn=new Date();
       this.lista.terminada=true;
     }else{
      this.lista.terminadaEn=null;
      this.lista.terminada=false;
     }

     this.deseosService.guardarStorage();

     console.log(this.deseosService.listas);
   }

  ngOnInit() {
  }

  borrar(i:number){
    this.lista.items.splice(i,1);//remueve elementos del array desde la posicion i, 1(cuantos más?)
    this.deseosService.guardarStorage();
  }



}
