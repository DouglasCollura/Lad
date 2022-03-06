import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { LoginServiceService } from './login-service.service';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Vacio, VacioU} from '../../assets/script/general';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AuthServiceService } from '../services/auth/auth-service.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private LoginServiceService:LoginServiceService,
        private router: Router,
        private authService: SocialAuthService,
        private AuthServiceService:AuthServiceService
    ) { }

    @Output() ExportClose = new EventEmitter<boolean>();
    @Input() IMPORTCLOSE:any;

    load_recoverypass: boolean = false;
    //!DATA=====================================================================
    //?CARGA===================================================================================

    //?GESTION===================================================================================
    usuario:any={
        correo:null,
        clave:null,
        tipo:1
    }

    user: SocialUser | undefined;
    loggedIn: boolean = false;

    //?CONTROL===================================================================================
    isOpen=false;
    habLogin=false;

    ngOnInit(): void {

        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
            console.log(this.user);
            
        });

        this.LoginServiceService.change.subscribe(res=>{
            this.isOpen = res.isOpen;
        })
    }

    //!FUNCIONES=============================================================

    //?CARGA=============================================================


    //?GESTION============================================================

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then( (res)=>{
            this.usuario.tipo = 2;
            this.usuario.correo = res.email;
            this.AuthServiceService.ValEmail({tipo:this.usuario.tipo,email:this.usuario.correo}).then((res)=>{
                if(res.success){
                    alert("NO ESTÁ REGISTRADO");
                    this.authService.signOut(true);
                    this.signInWithGoogle()
                }
                if(res.error){
                    this.AuthServiceService.LoginTemporal(this.usuario)
                    .then(login=>{
                        console.log(login)
                        sessionStorage.setItem('usuario', JSON.stringify(login.data));
                        sessionStorage.setItem('token', login.access_token);
                        //redirige
                        location.href = '/home';
                    })
                }
            });
        });
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res)=>{
            this.usuario.tipo = 3;
            this.usuario.correo = res.email;
            this.AuthServiceService.ValEmail({tipo:this.usuario.tipo,email:this.usuario.correo}).then((valid)=>{
                if(valid.success){
                    alert("NO ESTÁ REGISTRADO");
                    this.authService.signOut(true);
                    this.signInWithFB()
                }
                if(valid.error){
                    this.AuthServiceService.LoginTemporal(this.usuario)
                    .then(login=>{
                        console.log(login)

                        sessionStorage.setItem('usuario', JSON.stringify(login.data));
                        sessionStorage.setItem('token', login.access_token);
                        //redirige
                        location.href = '/home';
                    })
                }
            });
        });
    }

    signOut(): void {
        this.authService.signOut();
    }
    LogIn(){
        if(this.habLogin){
            this.AuthServiceService.Login(this.usuario)
            .then(login=>{
                if(login.access_token){
                    sessionStorage.setItem('usuario', JSON.stringify(login.data));
                    sessionStorage.setItem('token', login.access_token);
                    //redirige
                    location.href = '/home';
                }
            })
            .catch(erri=>{
                Swal.fire({
                    title: 'Email no existe!',
                    icon: 'error',
                });
                return;
            })
        }else{
            Swal.fire({
                title: 'Complete todos los campos',
                icon: 'error',
            });
            return;
        }
    }
    

    //?CONTROL==============================================================================

    ValAcceso(){
        if(Vacio(this.usuario)){
            this.habLogin = false;
        }else{
            this.habLogin = true;
        }
    }

    Cerrar() {
        this.LoginServiceService.toggle()
    }

    CloseRecovery(newItem: boolean) {
        this.load_recoverypass = false;
    }

}

