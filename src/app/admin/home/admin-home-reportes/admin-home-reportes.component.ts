import { Component, OnInit } from '@angular/core';
import { VacioU } from '../../../../assets/script/general';
import { ModalesService } from '../../../componentes/modales/modales.service';
declare var $: any;

@Component({
    selector: 'app-admin-home-reportes',
    templateUrl: './admin-home-reportes.component.html',
    styleUrls: ['./admin-home-reportes.component.css','../../main/main.component.css','../../admin-home/admin-home.component.css']
})
export class AdminHomeReportesComponent implements OnInit {

    constructor(
        private ModalesService: ModalesService
    ) { }

    ctrl_modal_denuncia:boolean = false;
    fase_modal_deuncia:number = 0;
    ngOnInit(): void {
    }

    // ! FUNCIONES ======================================================================

    // ? GESTION=====================================

    AnularAnuncios(){
        this.ctrl_modal_denuncia =false;
        this.ModalesService.Open(true);
        this.ModalesService.SetTitulo("Los anuncios de Juliana Robles Sánchez se ha eliminado con éxito");
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
}
