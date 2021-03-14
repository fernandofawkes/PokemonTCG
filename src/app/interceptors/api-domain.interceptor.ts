import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class ApiDomainInterceptor implements HttpInterceptor {
  domain: string;

  constructor(@Inject('API_DOMAIN') domain: string) {
    this.domain = domain;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.startsWith('http')) {
      //domain wasnt specified, plugin main api domain to request
      const transformedURL = this.domain + req.url;
      req = req.clone({ url: transformedURL });
    }

    return next.handle(req);
  }
}