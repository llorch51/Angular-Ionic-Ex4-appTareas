
export class ListaItem{

    descripcion:string;
    completado:boolean;

    constructor(_descripcion:string){
        this.descripcion=_descripcion;
        this.completado=false;
    }
}