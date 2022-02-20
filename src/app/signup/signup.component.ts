import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router} from '@angular/router';
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
        private router: Router
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
        },
        identidad:null,
        servicio:null,
        interes_identidad:null,
        interes_servicio:null
    };
    rep_clave = null;
    ctrl_identidad:any=[];
    ctrl_servicios:any=[];
    user_imagen_show:any;

    //?CONTROL===================================================================================
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
        if(!this.CanSignUp){
            Swal.fire({
                title: 'Complete y valide todos los campos',
                icon: 'error',
            });
            return;
        }
        this.fase = 1;
    }

    CargarImagen(event:any){
        const reader = new FileReader();
        reader.onload = (e:any) => {
            this.user_imagen_show = e.target.result ;
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    ActivarGeo(){
        navigator.geolocation.getCurrentPosition((pos:any)=>{
            var crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            this.router.navigate(['/home']);
        }, (err:any)=>{
            console.log(`ERROR(${err.code}): ${err.message}`);
            Swal.fire({
                title: 'Debe conceder permisos para continuar',
                text: 'tiene los permisos de geolocalización bloqueados, actívelos para continuar',
                icon: 'info',
            });
        });

        // let geo = navigator.geolocation
        // console.log(geo);
    }

    //?CONTROL==============================================================================
    selectIdentidad(id:number, event:any){
        console.log(id);
        if(!$(event.target).hasClass("btn-genero-active")){
            $(event.target).removeClass("btn-genero");
            $(event.target).addClass("btn-genero-active");
            this.ctrl_identidad.push(id);
        }else{
            $(event.target).removeClass("btn-genero-active");
            $(event.target).addClass("btn-genero");
            this.ctrl_identidad.forEach(function(car:any, index:any, object:any) {
                if(car == id){
                    object.splice(index, 1);
                }
            });
        }
        console.log(this.ctrl_identidad)
    }

    selectServicio(id:number, event:any){
        console.log(id);
        if(!$(event.target).hasClass("btn-genero-active")){
            $(event.target).removeClass("btn-genero");
            $(event.target).addClass("btn-genero-active");
            this.ctrl_servicios.push(id);
        }else{
            $(event.target).removeClass("btn-genero-active");
            $(event.target).addClass("btn-genero");
            this.ctrl_servicios.forEach(function(car:any, index:any, object:any) {
                if(car == id){
                    object.splice(index, 1);
                }
            });
        }
        console.log(this.ctrl_servicios)
    }

    SelectImg(){
        $( "#img" ).trigger( "click" ); 
    }

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

        if(this.fase == 4){
            if(this.ctrl_identidad.length == 0 && this.ctrl_servicios.length == 0){
                Swal.fire({
                    title: 'Seleccione almenos una opción',
                    icon: 'error',
                });
                return;
            }
            this.usuario.identidad = this.ctrl_identidad.join();
            this.usuario.servicio = this.ctrl_servicios.join();
            this.ctrl_identidad = [];
            this.ctrl_servicios = [];
            this.fase = 5;            
        }

        if(this.fase == 5){
            if(this.user_imagen_show){
                this.fase = 6;
            }else{
                Swal.fire({
                    title: 'Seleccione una imagen',
                    icon: 'error',
                });
                return;
            }
        }

        if(this.fase == 6){
            if(this.ctrl_identidad.length == 0 && this.ctrl_servicios.length == 0){
                Swal.fire({
                    title: 'Seleccione almenos una opción',
                    icon: 'error',
                });
                return;
            }
            this.usuario.interes_identidad = this.ctrl_identidad.join();
            this.usuario.interes_servicio = this.ctrl_servicios.join();
            this.ctrl_identidad = [];
            this.ctrl_servicios = [];
            this.fase = 7;   
        }

    }

    Cerrar() {
        this.close = true;
        setTimeout(() => { this.ExportClose.emit(this.close); }, 200);
    }

}
