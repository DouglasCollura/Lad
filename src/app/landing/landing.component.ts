import { Component, Input, OnInit } from '@angular/core';
import { LoginServiceService } from '../login/login-service.service';
import { ApiService } from '../services/api.service';
import { GeoLocationService } from '../services/location/geo-location.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

    constructor(
        private ApiService:ApiService,
        private GeoLocationService:GeoLocationService,
        private LoginServiceService:LoginServiceService
    ) { }

    load_login:boolean = false;
    load_signup:boolean = false;
    blur = false;

    @Input() IMPORTCLOSE:any;

    LoadLogin(){
        this.LoginServiceService.toggle()
       // this.blur=true;
    }

    LoadSignUp(){
        this.load_signup = true;
        this.blur=true 
    }

    CloseModal(newItem: boolean) {
        this.load_login = false;
        this.load_signup = false;
        this.blur = false;
    }

    ngOnInit(): void {
        this.GeoLocationService.getCountries()
        
        this.LoginServiceService.change.subscribe(res=>{
            this.blur = res.blur;
        }) 
    }
    

}
