import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxplotRendererComponent } from './boxplot-renderer.component';

describe('BoxplotRendererComponent', () => {
  let component: BoxplotRendererComponent;
  let fixture: ComponentFixture<BoxplotRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxplotRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxplotRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
