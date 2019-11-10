import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRendererComponent } from './grid-renderer.component';

describe('GridRendererComponent', () => {
  let component: GridRendererComponent;
  let fixture: ComponentFixture<GridRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
