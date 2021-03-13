import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import LOCALE_PT from '@angular/common/locales/pt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { httpInterceptorProviders } from './interceptors/interceptors.barrel';
import { registerLocaleData } from '@angular/common';

registerLocaleData(LOCALE_PT, 'pt-BR');
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: 'API_DOMAIN', useValue: environment.apiDomainPath },
    { provide: 'API_VERSION', useValue: environment.apiKey },
    { provide: 'API_KEY', useValue: 'v2' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
