import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionFindComponent } from './components/section-find/section-find.component';
import { CardsPokemonComponent } from './components/cards-pokemon/cards-pokemon.component';
import { CardItemPokemonComponent } from './components/card-item-pokemon/card-item-pokemon.component';
import { FormsModule } from '@angular/forms';
import { CardItemPreviewComponent } from './components/card-item-preview/card-item-preview.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { DataStoreService } from './services/data-store.service';
import { FetchService } from './services/fetch.service';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthenticationService } from './auth/authentication.service';
import { AuthInterceptorService } from './auth/auth.interceptor.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SectionFindComponent,
        CardsPokemonComponent,
        CardItemPokemonComponent,
        CardItemPreviewComponent,
        LoadingSpinnerComponent,
        LoginComponent,
        SignupComponent,
        HeaderComponent,
        WelcomeComponent,
        NotFoundComponent,
        AlertComponent
    ],
    providers: [AlertComponent, DataStoreService, FetchService, AuthenticationService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
