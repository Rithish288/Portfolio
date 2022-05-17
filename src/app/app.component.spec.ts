import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let instance: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    instance = fixture.componentInstance;
    expect(instance).toBeTruthy();
  });

  it(`should have as title 'Portfolio'`, () => {
    fixture = TestBed.createComponent(AppComponent);
    instance = fixture.componentInstance;
    expect(instance.title).toEqual('Portfolio');
  });

  it('should have a defaultTheme', () => {
    fixture = TestBed.createComponent(AppComponent);
    instance = fixture.componentInstance;
    expect(instance.defaultTheme).not.toBe(undefined);
  })

  it('should render the toolbar', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.nativeElement as HTMLElement;
    expect(app.innerHTML).toContain('app-toolbar');
  })

  it('should have a router-outlet', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.nativeElement as HTMLElement;
    expect(app.innerHTML).toContain('router-outlet');
  })

  it('first child must be div.wrapper', () => {
    fixture = TestBed.createComponent(AppComponent);
    const instance = fixture.componentInstance;
    instance.ngAfterViewInit();
    const app = fixture.nativeElement as HTMLElement;
    expect(instance.div.nativeElement).toBe(app.firstChild as HTMLDivElement)
  })

  it('should re-position scroll on reload', () => {
    fixture = TestBed.createComponent(AppComponent);
    instance = fixture.componentInstance;
    spyOn(instance, "positionScroll" as never);
    instance.ngAfterViewInit();
    expect(instance.positionScroll).toHaveBeenCalled();
  })
});
