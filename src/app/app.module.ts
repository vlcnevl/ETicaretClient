import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider} from '@abacritt/angularx-social-login';
import { LoginComponent } from './ui/components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { MatBadgeModule } from '@angular/material/badge';
@NgModule({
  declarations: [AppComponent,LoginComponent, DynamicLoadComponentDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=> localStorage.getItem("accessToken"), // bütün isteklerde headera tokeni yerleştirir.
        allowedDomains:["localhost:7162"] // sadece bu domaine tokeni yerlestir ve gönder.
      }
    }),
    SocialLoginModule,
    ReactiveFormsModule,
    GoogleSigninButtonModule,
    MatBadgeModule,

  ],
  providers: [
    {provide:"baseUrl",useValue:"https://localhost:7162/api",multi:true},
    {provide:"baseSignalRUrl",useValue:"https://localhost:7162/",multi:true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '59853966872-m1d7fjkbsc1m887ldu8evnni7759726p.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
     {
       provide: HTTP_INTERCEPTORS, useClass:HttpErrorHandlerInterceptorService,multi:true
     }

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
