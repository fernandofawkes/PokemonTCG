import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class ApiVersionInterceptor implements HttpInterceptor {
  version: string;

  constructor(@Inject('API_VERSION') version: string) {
    this.version = version;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({ url: req.url.replace('${version}', this.version) });

    return next.handle(req);
  }

}