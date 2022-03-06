import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { GeoLocationService } from '../services/location/geo-location.service';
import Swal from 'sweetalert2';
declare var $: any;
import { Vacio, VacioU } from '../../assets/script/general';
import { AuthServiceService } from '../services/auth/auth-service.service';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor(
        private GeoLocationService: GeoLocationService,
        private router: Router,
        private authService: SocialAuthService,
        private AuthServiceService:AuthServiceService
    ) { }

    //!DATA=====================================================================
    //?CARGA===================================================================================

    locaciones: any = null;
    estados: any = null;
    ciudades: any = null;

    //?GESTION===================================================================================
    user: SocialUser = new SocialUser;
    loggedIn: boolean = false;

    usuario: any = {
        tipo:null,
        datos: {
            nombre: null,
            correo: null,
            code_phone: '+',
            telefono: null,
            clave: null
        },
        fecha_nac: null,
        locacion: {
            pais: 0,
            estado: null,
            ciudad: null
        },
        identidad: null,
        servicio: null,
        interes_identidad: null,
        interes_servicio: null
    };
    img_user:any = null;
    rep_clave = null;
    ctrl_identidad: any = [];
    ctrl_servicios: any = [];
    user_imagen_show: any;

    //?CONTROL===================================================================================
    CanSignUp: boolean = false;
    close: boolean = false;
    fase = 0;
    @Output() ExportClose = new EventEmitter<boolean>();

    ngOnInit() {

        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
            console.log(this.user);
            if(this.loggedIn){

            }
        });
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
    CargarEstados() {
        this.estados = null;
        this.ciudades = null;
        this.usuario.locacion.estado = null;
        this.usuario.locacion.ciudad = null;
        console.log(this.usuario.locacion.pais);
        this.GeoLocationService.getStates(this.usuario.locacion.pais).then(res => {
            this.estados = res;
        });
    }

    CargarCiudad() {
        this.ciudades = null;
        this.usuario.locacion.ciudad = null;
        console.log(this.usuario.locacion.estado);
        this.GeoLocationService.getCities(this.usuario.locacion.estado).then(res => {
            this.ciudades = res;
        });
    }

    //?GESTION============================================================

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then( (res)=>{
            this.usuario.tipo = 2;
            this.usuario.datos.nombre = res.name;
            this.usuario.datos.correo = res.email;
            this.AuthServiceService.ValEmail({tipo:this.usuario.tipo,email:this.usuario.datos.correo}).then((res)=>{
                
                if(res.success){
                    this.fase = 1;
                }

                if(res.error){
                    alert("YA EXISTE");
                    this.authService.signOut(true);
                    this.signInWithGoogle()
                }
            });
        });
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then( (res)=>{
            this.usuario.tipo = 3;
            this.usuario.datos.nombre = res.name;
            this.usuario.datos.correo = res.email;
            this.AuthServiceService.ValEmail({tipo:this.usuario.tipo,email:this.usuario.datos.correo}).then((res)=>{
                
                if(res.success){
                    this.fase = 1;
                }

                if(res.error){
                    alert("YA EXISTE");
                    this.authService.signOut(true);
                    this.signInWithFB()
                }
            });
        });
    }

    refreshToken(): void {
        this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    }

    signOut(): void {
        this.authService.signOut();
    }

    CrearCuenta() {
        if (!this.CanSignUp) {
            Swal.fire({
                title: 'Complete y valide todos los campos',
                icon: 'error',
            });
            return;
        }

        this.usuario.tipo = 1;
        this.AuthServiceService.ValEmail({tipo:this.usuario.tipo,email:this.usuario.datos.correo})
        .then((res)=>{
            console.log(res)
            if(res.success){
                this.fase = 1;
            }
        })
        .catch(err=>{
            if(err.status == 500){
                alert("YA EXISTE");

            }
            if(err.error.email){
                alert("YA EXISTE");
            }
        });
    }

    CargarImagen(event: any) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.user_imagen_show = e.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        let formData = new FormData();
        let file = event.target.files[0];
        formData.append('imagen',file);
        this.img_user = formData;
    }

    ActivarGeo() {

        navigator.geolocation.getCurrentPosition((pos: any) => {
            var crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            console.log(this.usuario);
            this.SignUp();
        }, (err: any) => {
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

    SignUp(){
        this.AuthServiceService.signUp(this.usuario)
        .then(res=>{

            if(res.success){
                this.AuthServiceService.UpImage(this.img_user)
                .then(img=>{
                    if(this.usuario.tipo == 1){
                        this.AuthServiceService.Login({correo:this.usuario.datos.correo, clave: this.usuario.datos.clave})
                        .then(login=>{
                            sessionStorage.setItem('usuario', JSON.stringify(login.data));
                            sessionStorage.setItem('ruta_img', JSON.stringify(img));
                            sessionStorage.setItem('token', login.access_token);
                            //redirige
                            location.href = '/home';
                        })
                    }else{
                        this.AuthServiceService.LoginTemporal(this.usuario)
                        .then(login=>{
                            sessionStorage.setItem('usuario', JSON.stringify(res.data));
                            sessionStorage.setItem('ruta_img', JSON.stringify(img));
                            sessionStorage.setItem('token', login.access_token);
                            //redirige
                            location.href = '/home';
                        })
                    }

                })
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }
    //?CONTROL==============================================================================
    selectIdentidad(id: number, event: any) {
        console.log(id);
        if (!$(event.target).hasClass("btn-genero-active")) {
            $(event.target).removeClass("btn-genero");
            $(event.target).addClass("btn-genero-active");
            this.ctrl_identidad.push(id);
        } else {
            $(event.target).removeClass("btn-genero-active");
            $(event.target).addClass("btn-genero");
            this.ctrl_identidad.forEach(function (car: any, index: any, object: any) {
                if (car == id) {
                    object.splice(index, 1);
                }
            });
        }
        console.log(this.ctrl_identidad)
    }

    selectServicio(id: number, event: any) {
        console.log(id);
        if (!$(event.target).hasClass("btn-genero-active")) {
            $(event.target).removeClass("btn-genero");
            $(event.target).addClass("btn-genero-active");
            this.ctrl_servicios.push(id);
        } else {
            $(event.target).removeClass("btn-genero-active");
            $(event.target).addClass("btn-genero");
            this.ctrl_servicios.forEach(function (car: any, index: any, object: any) {
                if (car == id) {
                    object.splice(index, 1);
                }
            });
        }
        console.log(this.ctrl_servicios)
    }

    SelectImg() {
        $("#img").trigger("click");
    }

    mostrar($event: any) {
        $event.target.selectedOptions[0].text = '+' + this.usuario.datos.code_phone;
    }

    PassF1() {
        if (Vacio(this.usuario.datos) || this.usuario.datos.code_phone == '+' || this.rep_clave != this.usuario.datos.clave) {
            this.CanSignUp = false;
        } else {
            this.CanSignUp = true;
        }
    }

    CtrlForm() {
        if (this.fase == 2) {
            if (VacioU(this.usuario.fecha_nac)) {
                Swal.fire({
                    title: 'Complete todos los campos',
                    icon: 'error',
                });
                return;
            }
            this.fase = 3;
        }
        else if (this.fase == 3) {
            if (Vacio(this.usuario.locacion)) {
                Swal.fire({
                    title: 'Complete todos los campos',
                    icon: 'error',
                });
                return;
            }
            console.log(this.usuario)
            this.fase = 4;
        }

        else if (this.fase == 4) {
            if (this.ctrl_identidad.length == 0 && this.ctrl_servicios.length == 0) {
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

        else if (this.fase == 5) {
            if (this.user_imagen_show) {
                this.fase = 6;
            } else {
                Swal.fire({
                    title: 'Seleccione una imagen',
                    icon: 'error',
                });
                return;
            }
        }

        else{
            if (this.ctrl_identidad.length == 0 && this.ctrl_servicios.length == 0) {
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
