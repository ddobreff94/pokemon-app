import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './app/auth/auth.interceptor.service';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AuthenticationService } from './app/auth/authentication.service';
import { FetchService } from './app/services/fetch.service';
import { DataStoreService } from './app/services/data-store.service';
import { AlertComponent } from './app/shared/alert/alert.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(FormsModule, BrowserModule, AppRoutingModule),
        AlertComponent, DataStoreService, FetchService, AuthenticationService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
