import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-admin-market',
    templateUrl: './admin-market.component.html',
    styleUrls: ['./admin-market.component.css','../main/main.component.css']
})
export class AdminMarketComponent implements OnInit {

    constructor() { }
    ctrl_menu = 0;

    ngOnInit(): void {
    }




    nav(event: any, fase: number) {
        this.ctrl_menu = fase;
        $(".btn-sub-nav-admin-active").removeClass("btn-sub-nav-admin-active");
        $("#" + event).addClass("btn-sub-nav-admin-active");
    }
}
