import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css','../main/main.component.css']
})
export class AdminHomeComponent implements OnInit {

    constructor() { }
    ctrl_menu = 0;
    ctrl_modal_filtro:boolean = false;

    ngOnInit(): void {

        if(this.ctrl_menu == 0){
            $("#gest_user").addClass("btn-sub-nav-admin-active");
        }else if(this.ctrl_menu == 1){
            $("#gest_anuncio").addClass("btn-sub-nav-admin-active");
        }else{
            $("#reporte").addClass("btn-sub-nav-admin-active");
        }

        $( function() {

           

            $(document).on("click","#open_filtro",function(){
                color_linea("rango-distancia-min","rango-distancia-max","line-distancia");
                color_linea("rango-edad-min","rango-edad-max","line-edad");
            });

            $( document ).on("input","#rango-distancia-min",function(){
                if($( "#rango-distancia-min" ).val() - $( "#rango-distancia-max" ).val() >= 0){
                    $( "#rango-distancia-min" ).val($( "#rango-distancia-max" ).val()) 
                }
                color_linea("rango-distancia-min","rango-distancia-max","line-distancia");
            });

            $( document ).on("input","#rango-distancia-max",function(){
                if($( "#rango-distancia-max" ).val() - $( "#rango-distancia-min" ).val() <= 0){
                    $( "#rango-distancia-max" ).val($( "#rango-distancia-min" ).val()) 
                }
                color_linea("rango-distancia-min","rango-distancia-max","line-distancia");
            })

            $( document ).on("input","#rango-edad-min",function(){
                if($( "#rango-edad-min" ).val() - $( "#rango-edad-max" ).val() >= 0){
                    $( "#rango-edad-min" ).val($( "#rango-edad-max" ).val()) 
                }
                color_linea("rango-edad-min","rango-edad-max","line-edad");
            });

            $( document ).on("input","#rango-edad-max",function(){
                if($( "#rango-edad-max" ).val() - $( "#rango-edad-min" ).val() <= 0){
                    $( "#rango-edad-max" ).val($( "#rango-edad-min" ).val()) 
                }
                color_linea("rango-edad-min","rango-edad-max","line-edad");
            })

            function color_linea(id_min:string, id_max:string, id_linea:string){
                let val1= ($("#"+id_min).val() /100) *100;
                let val2=($("#"+id_max).val()/100) *100;
                $("#"+id_linea).css('background', 'linear-gradient( to right, #DFDFDF '+val1+'%'+', #FF3C76 '+val1+'%'+', #FF3C76 '+val2+'%'+', #DFDFDF '+val2+'%'+')');
            }
        });

    }



    OpenFiltro(){
        this.ctrl_modal_filtro = true;
    }


    nav(event: any, fase: number) {
        this.ctrl_menu = fase;
        $(".btn-sub-nav-admin-active").removeClass("btn-sub-nav-admin-active");
        $("#" + event).addClass("btn-sub-nav-admin-active");
    }


}
