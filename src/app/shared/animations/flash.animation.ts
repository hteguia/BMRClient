import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';

export const flashAnimation = animation([
    style({
        opacity: '{{ opacity }}',
    }),
    animate('400ms ease-in', style({ opacity: 1 })),
]);