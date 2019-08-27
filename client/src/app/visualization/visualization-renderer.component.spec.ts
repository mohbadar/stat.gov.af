import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationRendererComponent } from './visualization-renderer.component';

describe('VisualizationRendererComponent', () => {
  let component: VisualizationRendererComponent;
  let fixture: ComponentFixture<VisualizationRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
