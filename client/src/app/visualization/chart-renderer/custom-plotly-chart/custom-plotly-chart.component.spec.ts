import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPlotlyChartComponent } from './custom-plotly-chart.component';

describe('CustomPlotlyChartComponent', () => {
  let component: CustomPlotlyChartComponent;
  let fixture: ComponentFixture<CustomPlotlyChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPlotlyChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPlotlyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
