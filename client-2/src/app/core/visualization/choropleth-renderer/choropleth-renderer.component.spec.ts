import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoroplethRendererComponent } from './choropleth-renderer.component';

describe('ChoroplethRendererComponent', () => {
  let component: ChoroplethRendererComponent;
  let fixture: ComponentFixture<ChoroplethRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoroplethRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoroplethRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
