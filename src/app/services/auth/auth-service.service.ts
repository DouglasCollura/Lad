import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {

    constructor(
        private http: HttpClient,

    ) { }

    url = environment.serverUrl;
    token=sessionStorage.getItem('token');

    async ValEmail(data:any): Promise<any> {
        const send = this.http.post(`${this.url}validate-email`, data).toPromise()
        return send;
    }

    async signUp(data:any): Promise<any> {
        const send = this.http.post(`${this.url}signup`, data).toPromise()
        return send;
    }

    async UpImage(data:any): Promise<any> {
        const send = this.http.post(`${this.url}sendImg`, data).toPromise()
        return send;
    }

    async LoginTemporal(data:any): Promise<any> {
        const send = this.http.post(`${this.url}login-temp`, data).toPromise()
        return send;
    }

    async Login(data:any): Promise<any> {
        const send = this.http.post(`${this.url}login`, data).toPromise()
        return send;
    }
    
    async LogOut(): Promise<any> {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token
        });
        const send = this.http.get(`${this.url}logout`, {headers} ).toPromise()
        return send;
    }
}
