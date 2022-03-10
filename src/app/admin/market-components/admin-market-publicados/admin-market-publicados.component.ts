import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin-market-publicados',
    templateUrl: './admin-market-publicados.component.html',
    styleUrls: ['./admin-market-publicados.component.css', '../../admin-market/admin-market.component.css']
})
export class AdminMarketPublicadosComponent implements OnInit {

    constructor() { }

    // ! DATA====


    // ?MODALES ===========================
    ctrl_modal_negocio:boolean=true;

    // ?FASES MODALES ===========================
    fase_modal_negocio:number=1;
    paso_modal_negocio:number=1;

    ngOnInit(): void {
    }

}
