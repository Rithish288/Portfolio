import { trigger, style, transition, animate } from "@angular/animations";

export const fadeIn = trigger('fadeIn', [
  transition('void => *', [
    style({opacity: 0}),
    animate('500ms ease', style({opacity: 1})),
  ])
])
