import { style, animate, animation } from "@angular/animations";

// export const fadeIn = trigger('fadeIn', [
//   transition('void => *', [
//     style({opacity: 0}),
//     animate('500ms ease', style({opacity: 1})),
//   ])
// ])

export const transitionFadeIn = (direction: 'x' | 'y', delay: string = '0ms') => animation([
  style({opacity: 0, transform: direction === "x" ? "translateX(-50px)" : "translateY(-40px)"}),
  animate(`1000ms ${delay} cubic-bezier(0.62, 0.05, 0.36, 0.99)`),
  style({opacity: 1, transform: direction === "x" ? "translateX(0px)" : "translateY(0px)"})
]);
