import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotTableRendererComponent } from './pivot-table-renderer.component';

describe('PivotTableRendererComponent', () => {
  let component: PivotTableRendererComponent;
  let fixture: ComponentFixture<PivotTableRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotTableRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotTableRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
