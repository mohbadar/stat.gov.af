import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelRendererComponent } from './funnel-renderer.component';

describe('FunnelRendererComponent', () => {
  let component: FunnelRendererComponent;
  let fixture: ComponentFixture<FunnelRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
