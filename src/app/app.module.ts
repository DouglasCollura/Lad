import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RecoverypassComponent } from './recoverypass/recoverypass.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './admin/main/main.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminMarketComponent } from './admin/admin-market/admin-market.component';
import { AdminSolicitudesComponent } from './admin/admin-solicitudes/admin-solicitudes.component';
import { AdminHomeUsuarioComponent } from './admin/home/admin-home-usuario/admin-home-usuario.component';
import { AdminHomeAnunciosComponent } from './admin/home/admin-home-anuncios/admin-home-anuncios.component';
import { AdminHomeReportesComponent } from './admin/home/admin-home-reportes/admin-home-reportes.component';


import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider,FacebookLoginProvider } from 'angularx-social-login';
import { ModalesComponent } from './componentes/modales/modales.component';
import { AdminMarketPublicadosComponent } from './admin/market-components/admin-market-publicados/admin-market-publicados.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    RecoverypassComponent,
    HomeComponent,
    MainComponent,
    AdminHomeComponent,
    AdminMarketComponent,
    AdminSolicitudesComponent,
    AdminHomeUsuarioComponent,
    AdminHomeAnunciosComponent,
    AdminHomeReportesComponent,
    ModalesComponent,
    AdminMarketPublicadosComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
          // ID GOOGLE LOCALHOST 998158333459-v13en8bhgur1on2evjum0g9h37mod054.apps.googleusercontent.com
          // ID GOOGLE DEVELOPER 710857039553-pc3j2qjte7573b1t9dnjd2h6g73gvlb1.apps.googleusercontent.com
          // 524875122338654 DEV
          // LOCAL 1588572954831923
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '710857039553-pc3j2qjte7573b1t9dnjd2h6g73gvlb1.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1588572954831923')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
