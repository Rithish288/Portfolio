import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { defer, finalize, NEVER, share } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private overlayRef: OverlayRef;
  public readonly spinner$ = defer(() => {
    this.show();
    return NEVER.pipe(
      finalize(() => {
        this.hide();
      })
    );
  }).pipe(share());

  constructor(private overlay: Overlay) { }

  public show() {
    if(!this.overlayRef) this.overlayRef = this.overlay.create({
      positionStrategy:
        this.overlay.position().global()
          .centerHorizontally()
          .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true,
    });
    const loaderPortal = new ComponentPortal(SpinnerComponent);
    this.overlayRef.attach(loaderPortal);
  }

  public hide() {
    if(this.overlayRef) this.overlayRef.detach();
  }
}
