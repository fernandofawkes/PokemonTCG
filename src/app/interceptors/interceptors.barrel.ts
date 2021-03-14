import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiDomainInterceptor } from './api-domain.interceptor';
import { ApiVersionInterceptor} from './api-version.interceptor';
import { ApiKeyInterceptor} from './api-key.interceptor';
import { LoadingInterceptor } from './loading.interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [ 
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ApiDomainInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ApiVersionInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true }
];