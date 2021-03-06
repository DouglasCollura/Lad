import { Component, OnInit } from '@angular/core';
import { SocialAuthService} from "angularx-social-login";
import { Router} from '@angular/router';
import { AuthServiceService } from '../services/auth/auth-service.service';

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(
        private authService: SocialAuthService,
        private router: Router,
        private AuthServiceService:AuthServiceService
    ) { }

    loggedIn: boolean = false;

    ngOnInit(): void {
        this.authService.authState.subscribe((user) => {
            this.loggedIn = (user != null);
        });
    }


    signOut(): void {
        this.AuthServiceService.LogOut().then(res=>{
            if(res.message){
                sessionStorage.clear();
                this.router.navigate(["/"]);
            }
        });
    }

    nav(event: any) {
        $(".menu-nav-active").removeClass("menu-nav-active");
        $("#" + event).addClass("menu-nav-active");
    }

}
