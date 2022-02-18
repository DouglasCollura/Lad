import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { LoginServiceService } from './login-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private LoginServiceService:LoginServiceService
    ) { }

    @Output() ExportClose = new EventEmitter<boolean>();
    @Input() IMPORTCLOSE:any;

    load_recoverypass: boolean = false;
    // ! DATA
    usuario:any={
        correo:null,
        clave:null
    }
    //?VARCONTROL
    isOpen=false;
    habLogin=false;

    ngOnInit(): void {
        this.LoginServiceService.change.subscribe(res=>{
            this.isOpen = res.isOpen;
        })
    }

    //!FUNCIONES
    LogIn(){
        
    }
    
    ValAcceso(){
        if(this.usuario.correo != '' && this.usuario.clave != ''){
            this.habLogin = true;
        }else{
            this.habLogin = false;
        }
    }

    Cerrar() {
        this.LoginServiceService.toggle()
    }

    CloseRecovery(newItem: boolean) {
        this.load_recoverypass = false;
    }

}

