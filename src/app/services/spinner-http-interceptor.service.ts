import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { SpinnerService } from './spinner.service';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerHttpInterceptorService {

  constructor(private readonly spinnerOverlayService: SpinnerService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const spinnerSubscription = this.spinnerOverlayService.spinner$.subscribe();
    return next.handle(req).pipe(finalize(() => spinnerSubscription.unsubscribe()));
  }
}
