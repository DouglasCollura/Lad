import { Component, OnInit } from '@angular/core';
import { ModalesService } from '../../../componentes/modales/modales.service';
import { VacioU } from 'dist/ladies-vip/assets/script/general';

declare var $: any;

@Component({
    selector: 'app-admin-home-anuncios',
    templateUrl: './admin-home-anuncios.component.html',
    styleUrls: ['./admin-home-anuncios.component.css','../../main/main.component.css','../../admin-home/admin-home.component.css']
})
export class AdminHomeAnunciosComponent implements OnInit {

    constructor(
        private ModalesService: ModalesService
    ) { }

    clave_delete:string="";

    // ?MODALES ===========================
    ctrl_modal_mensaje:boolean=false;
    ctrl_modal_bloqueo:boolean=false;
    ctrl_modal_delete:boolean=false;
    ctrl_modal_anuncio:boolean=false;

    openInputBloqueo:boolean=false;

    // ?FASES MODALES ===========================
    fase_modal_mensaje:number=0;
    ctrl_fase_delete: number = 0;
    CanDelete:boolean= false;

    ngOnInit(): void {
    }

    // ! FUNCIONES ======================================================================

    // ? GESTION=====================================
    BloquearCuenta(event:any){
        console.log($(event.target).text())
        this.ctrl_modal_bloqueo = false;
        this.ModalesService.Open(true);
        this.ModalesService.SetTitulo("Usuario bloqueado");
        this.ModalesService.SetDescripcion("El usuario “Matías Saldivar” ha sido bloqueado con éxito");
    }

    EliminarAnuncio(){
        this.ctrl_modal_delete = false;
        this.ModalesService.Open(true);
        this.ModalesService.SetTitulo("Anuncio eliminado");
        this.ModalesService.SetDescripcion("El anuncio del usuario “Matías Saldivar” ha sido eliminado con éxito");
    }

    //? CONTROL===========================================
    ToggleOptionTable(i: number) {
        if ($("#" + i).css("display") == 'grid') {
            $("#" + i).css("display", "none");
        } else {
            $(".group-table-delete").css("display", "none")
            $("#" + i).css("display", "grid");
        }
    }

    OpenModalMessage(){
        $(".group-table-delete").css("display", "none")
        this.ctrl_modal_mensaje = true;
    }

    OpenModalBloqueo(){
        $(".group-table-delete").css("display", "none")
        this.ctrl_modal_bloqueo = true;
    }

    OpenModalDelete(){
        $(".group-table-delete").css("display", "none")
        this.ctrl_modal_delete = true;
    }

    CloseModalBloqueo(){
        this.ctrl_modal_bloqueo = false;
        this.openInputBloqueo =false;
    }

    ToggleFaseModalMensaje(event:any, fase:number){
        this.fase_modal_mensaje = fase;
        $(".card .btn-sub-nav-admin-active").removeClass("btn-sub-nav-admin-active");
        $(event.target).addClass("btn-sub-nav-admin-active");
    }

    ValDelete(){
        if(VacioU(this.clave_delete)){
            this.CanDelete = false;
        }else{
            this.CanDelete = true;
        }
    }
}
