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
    token: string = "";


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
}
