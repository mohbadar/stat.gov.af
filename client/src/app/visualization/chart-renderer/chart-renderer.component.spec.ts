import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRendererComponent } from './chart-renderer.component';

describe('ChartRendererComponent', () => {
  let component: ChartRendererComponent;
  let fixture: ComponentFixture<ChartRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
