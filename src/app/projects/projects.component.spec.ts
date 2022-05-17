import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let projects: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a mat-sidenav', () => {
    fixture = TestBed.createComponent(ProjectsComponent);
    projects = fixture.nativeElement as HTMLElement;
    expect(projects.innerHTML).toContain('mat-sidenav-container');
  })

  it('should have the window object', () => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    expect(component.window).toBeDefined();
  })
});
