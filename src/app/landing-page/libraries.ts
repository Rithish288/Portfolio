const URL = 'assets/library-logos/';
const URL2 = 'assets/language-logos/';

const angularExp = new Date().getFullYear() - 2020;
const apexChartExp = new Date().getFullYear() - 2020

export interface Library { title: string; imageUrl: string; description: string;};
export interface Language { title: string; imageUrl: string; description: string;};

export const libraries: Library[] = [
  {title: 'angular',            imageUrl: URL + 'angular-logo.png',            description: `Angular is an efficient tool for building large-scale applications. I have been using Angular for over ${angularExp} years while utilizing many of its features including cdk, forms and other core features.`},
  {title: 'angular animations', imageUrl: URL + 'angular-animations-logo.png', description: `Angular animations is a performant feature of angular supported by almost all browsers. I have used the api for quite a long time and I can say that I have made some complex animations with it.`},
  {title: 'angular material',   imageUrl: URL + 'angular-material-logo.png',   description: `Angular material is a modern UI development kit with various themes. Material is not much of a performant tool but I have managed to push its performance to the top.`},
  {title: 'apex-charts',        imageUrl: URL + 'apex-charts-logo.png',        description: `Apex-charts is an open source chart library supported by many of the major frameworks. I have used apex-charts for over ${apexChartExp} years.`},
  {title: 'chartjs',            imageUrl: URL + 'chartjs.png',                 description: `Chartjs is another lightweight chart library. I once used this library to build a periodic table site. I have deployed it on google's firebase.`},
  {title: 'jasmine',            imageUrl: URL + 'jasmine-logo.png',            description: `Jasmine + Karma is a unit testing library widely supported my many frameworks. Testing may not be one of my core features but I am very good at it.`},
  {title: 'rxJs',               imageUrl: URL + 'rxjs-logo.png',               description: `RxJs with Angular is what makes http requests super cool! This library was difficult for me to get the gist of it but eventually I got used to RxJs and can write some very performant requests!`},
  {title: 'scss',               imageUrl: URL + 'scss-logo.png',               description: `Scss to CSS is like TypeScript to JavaScript. It just adds more features to CSS. Sass/Scss might be overwhelming to any beginner but it takes some time to get used to. Even now Scss is somewhat confusing with its mixins and includes.`}
]

export const languages: Language[] = [
  {
    title: 'HTML5',
    imageUrl: URL2 + 'html5-logo.png',
    description: ''
  },
  {
    title: 'CSS3',
    imageUrl: URL2 + 'css3-logo.png',
    description: ''
  },
  {
    title: 'TypeScript',
    imageUrl: URL2 + 'typescript-logo.png',
    description: ''
  },
  {
    title: 'Java',
    imageUrl: URL2 + 'java-logo.png',
    description: ''
  },
  {
    title: 'Python',
    imageUrl: URL2 + 'python-logo.png',
    description: ''
  }
]
