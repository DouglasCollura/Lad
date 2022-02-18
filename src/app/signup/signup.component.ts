import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GeoLocationService } from '../services/location/geo-location.service';
import Swal from 'sweetalert2';
declare var $: any;
import Vacio from '../../assets/script/general';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor(
        private GeoLocationService: GeoLocationService,
    ) { }

    //!DATA
    //?CARGA
    locaciones: any = null;
    //?GESTION
    usuario: any = {
        nombre: null,
        correo: null,
        code_phone: '+',
        telefono: null,
        clave: null
    };

    //?CONTROL
    CanSignUp:boolean = false;
    close: boolean = false;
    fase=0;
    @Output() ExportClose = new EventEmitter<boolean>();

    ngOnInit() {
        this.GeoLocationService.getCountries().then(res => {
            this.locaciones = res;
        });
        // $(document).click
        // (() => {  
        //     alert('Jquery is working !!!');  
        // });  
    }

    //!FUNCIONES

    CrearCuenta() {
        if(Vacio(this.usuario)){
            Swal.fire({
                title: 'Complete todos los campos',
                icon: 'error',
            });
            return;
        }
        this.fase = 1;
    }

    //?CONTROL

    mostrar($event: any) {
        $event.target.selectedOptions[0].text = '+' + this.usuario.code_phone;
    }

    Cerrar() {
        this.close = true;
        setTimeout(() => { this.ExportClose.emit(this.close); }, 200);
    }

    Vacio(){
        if(Vacio(this.usuario)){
            this.CanSignUp =false;
        }else{
            this.CanSignUp =true;
        }
    }
    

}
