import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoursComponent } from './components/cours/cours.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { ClasseComponent } from './components/classe/classe.component';
import { SpecialiteComponent } from './components/specialite/specialite.component';
import { PublicationComponent } from './components/publication/publication.component';
import { RegisterComponent } from './components/register/register.component';
import { AddEvaluationComponent } from './components/add-evaluation/add-evaluation.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DadminComponent } from './components/dadmin/dadmin.component';
import { AddPublicationComponent } from './components/publicationn/add-publication/add-publication.component';
import { AddSpecialiterComponent } from './components/add-specialiter/add-specialiter.component';
import { DashbordlatbarComponent } from './components/dashbordlatbar/dashbordlatbar.component';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule, HTTP_INTERCEPTORS, withFetch } from '@angular/common/http';
import { LoginComponentComponent } from './components/login-component/login-component.component';
//import { ListuseruComponentComponent } from './components/listuseru-component/listuseru-component.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NgxPasswordStrengthModule } from 'ngx-password-strength';
//import{ListuseruComponentComponent}from'./components/user-list-component/user-list-component.component;
import { UserListComponentComponent } from './components/user-list-component/user-list-component.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { GoogleCallbackComponent } from './components/google-callback/google-callback.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
///import { withFetch } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { TabsModule } from 'ngx-bootstrap/tabs';


//import{user}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,

    CoursComponent,
      ScheduleComponent,
      EvaluationComponent,
      ClasseComponent,
      SpecialiteComponent,
      PublicationComponent,
      RegisterComponent,
      AddEvaluationComponent,
      DadminComponent,
      AddPublicationComponent,
      AddSpecialiterComponent,
      DashbordlatbarComponent,
      LoginComponentComponent,
      UserListComponentComponent,
    //  ListuseruComponentComponent,
      ForgetPasswordComponent,
      ChangePasswordComponent,
      GoogleCallbackComponent,
      AccountSettingsComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TabsModule.forRoot(),

    HttpClientModule, // Utilisez withFetch() ici
    //HttpClientModule,
   // BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgxPasswordStrengthModule,
    SocialLoginModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
NgxCaptchaModule,
    FormsModule,


  ],
  providers: [
    provideClientHydration(),

   {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,},
    provideAnimationsAsync(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('VotreClientIDGoogle')
          }
        ]
      } as SocialAuthServiceConfig,
    }

    // { provide: HTTP_INTERCEPTORS, useClass: provideHttpClient(), multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})


export class AppModule { }
