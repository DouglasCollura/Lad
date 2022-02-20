import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { LoginServiceService } from './login-service.service';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Vacio, VacioU} from '../../assets/script/general';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private LoginServiceService:LoginServiceService,
        private router: Router
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
        if(this.habLogin){
            this.router.navigate(['/home']);
        }else{
            Swal.fire({
                title: 'Complete todos los campos',
                icon: 'error',
            });
            return;
        }
    }
    
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

