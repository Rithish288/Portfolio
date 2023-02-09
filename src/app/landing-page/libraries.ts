const URL = 'assets/library-logos/';
const URL2 = 'assets/language-logos/';

export interface Skills { title: string; imageUrl: string;};

export const skills: Skills[] = [
  {title: 'Angular', imageUrl: URL + 'angular-logo.png'},
  {title: 'RxJS', imageUrl: URL + 'rxjs-logo.png'},
  {title: 'Scss', imageUrl: URL + 'scss-logo.png'},
  { title: 'HTML5', imageUrl: URL2 + 'html5-logo.png'},
  { title: 'CSS3', imageUrl: URL2 + 'css3-logo.png'},
  { title: 'TypeScript', imageUrl: URL2 + 'typescript-logo.png'},
  { title: 'C++', imageUrl: URL2 + 'cpp-logo.png' }
]
