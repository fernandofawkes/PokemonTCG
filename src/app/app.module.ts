import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import LOCALE_PT from '@angular/common/locales/pt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { httpInterceptorProviders } from './interceptors/interceptors.barrel';
import { registerLocaleData } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetailsComponent } from './components/details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { ToColorPipe } from './pipes/to-color.pipe';
import { DetectVisibilityDirective } from './directives/detect-visibility.directive';

registerLocaleData(LOCALE_PT, 'pt-BR');
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    ResultsComponent,
    CardComponent,
    FooterComponent,
    DetailsComponent,
    LazyImageComponent,
    ToColorPipe,
    DetectVisibilityDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: 'API_DOMAIN', useValue: environment.apiDomainPath },
    { provide: 'API_VERSION', useValue: 'v2'},
    { provide: 'API_KEY', useValue: environment.apiKey  },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
