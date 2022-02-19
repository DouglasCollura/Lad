import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GeoLocationService } from '../services/location/geo-location.service';
import Swal from 'sweetalert2';
declare var $: any;
import { Vacio, VacioU} from '../../assets/script/general';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor(
        private GeoLocationService: GeoLocationService,
    ) { }

    //!DATA=====================================================================
    //?CARGA===================================================================================
    
    locaciones: any = null;
    estados:any = null;
    ciudades:any = null;

    //?GESTION===================================================================================

    usuario: any = {
        datos:{
            nombre: null,
            correo: null,
            code_phone: '+',
            telefono: null,
            clave: null
        },
        fecha_nac:null,
        locacion:{
            pais:null,
            estado:null,
            ciudad:null
        }
    };
    rep_clave = null;

    //?CONTROL===================================================================================
    CanSignUp:boolean = false;
    close: boolean = false;
    fase=3;
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

    //!FUNCIONES=============================================================

    //?CARGA=============================================================
    CargarEstados(){
        this.estados = null;
        this.ciudades = null;
        this.usuario.locacion.estado = null;
        this.usuario.locacion.ciudad = null;
        console.log(this.usuario.locacion.pais);
        this.GeoLocationService.getStates(this.usuario.locacion.pais).then(res => {
            this.estados = res;
        });
    }

    CargarCiudad(){
        this.ciudades = null;
        this.usuario.locacion.ciudad = null;
        console.log(this.usuario.locacion.estado);
        this.GeoLocationService.getCities(this.usuario.locacion.estado).then(res => {
            this.ciudades = res;
        });
    }

    //?GESTION============================================================
    CrearCuenta() {
        if(Vacio(this.usuario.datos)){
            Swal.fire({
                title: 'Complete todos los campos',
                icon: 'error',
            });
            return;
        }
        this.fase = 1;
    }

    //?CONTROL==============================================================================

    mostrar($event: any) {
        $event.target.selectedOptions[0].text = '+' + this.usuario.datos.code_phone;
    }

    PassF1(){
        if(Vacio(this.usuario.datos) || this.usuario.datos.code_phone == '+' || this.rep_clave != this.usuario.datos.clave){
            this.CanSignUp =false;
        }else{
            this.CanSignUp =true;
        }      
    }

    CtrlForm(){
        if(this.fase == 2){
            if(VacioU(this.usuario.fecha_nac)){
                Swal.fire({
                    title: 'Complete todos los campos',
                    icon: 'error',
                });
                return;
            }
            this.fase =3;
        }
        if(this.fase == 3){
            if(Vacio(this.usuario.locacion)){
                Swal.fire({
                    title: 'Complete todos los campos',
                    icon: 'error',
                });
                return;
            }
            this.fase =4;
        } 
    }

    Cerrar() {
        this.close = true;
        setTimeout(() => { this.ExportClose.emit(this.close); }, 200);
    }

}
