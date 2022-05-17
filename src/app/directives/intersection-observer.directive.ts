import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, filter, Observable, Subject, takeUntil } from 'rxjs';

export enum IntersectionStatus {
  Visible = 'Visible',
  Pending = 'Pending',
  NotVisible = 'NotVisible'
}

export function isIntersecting(entry: IntersectionObserverEntry) {
  return entry.isIntersecting || entry.intersectionRatio > 0;
}

export async function isVisible(element: HTMLElement) {
  return new Promise(resolve => {
    const observer = new IntersectionObserver(([entry]) => {
      resolve(entry.isIntersecting);
      observer.disconnect();
    });
    observer.observe(element);;
  })
}

export const fromIntersectionObserver = (
  element: HTMLElement,
  config: IntersectionObserverInit,
  debounce: number = 0
) => {
  return new Observable<IntersectionStatus>(subscriber => {
    const subject$ = new Subject<{
      entry: IntersectionObserverEntry;
      observer: IntersectionObserver;
    }>();

    const intersectionObserver = new IntersectionObserver(
      (entries,observer) => {
        for (let i = 0; i < entries.length; i++) {
          if(isIntersecting(entries[i])) {
            subject$.next({entry: entries[i], observer: observer});
          }
        }
      }, config)
    subject$.subscribe(() => {
      subscriber.next(IntersectionStatus.Pending);
    });
    subject$.pipe(
      debounceTime(debounce),
      filter(Boolean)
    ).subscribe(async ({entry}) => {
      const isEntryVisible = await isVisible(entry.target as HTMLElement);
      if(isEntryVisible) {
        subscriber.next(IntersectionStatus.Visible);
      } else {
        subscriber.next(IntersectionStatus.NotVisible);
      }
    });
    intersectionObserver.observe(element);

    return {
      unsubscribe() {
        intersectionObserver.disconnect();
        subject$.unsubscribe();
      }
    }
  })
}

@Directive({
  selector: '[appIntersectionObserver]',
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  @Input() intersectionDebounce = 0;
  @Input() intersectionRootMargin = '0px';
  @Input() intersectionRoot: HTMLElement;
  @Input() intersectionThreshold: number | number[];
  @Output() visibilityChange = new EventEmitter<IntersectionStatus>();
  private destroy$ = new Subject();
  constructor(private element: ElementRef<HTMLElement>) { }
  ngOnInit(): void {
    const element = this.element.nativeElement;
    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: 0
    };

    fromIntersectionObserver(element, config, this.intersectionDebounce).pipe(
      takeUntil(this.destroy$)
    ).subscribe((status) => {
      this.visibilityChange.emit(status);
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

}
