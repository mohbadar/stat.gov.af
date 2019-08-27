import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SunburstSequenceRendererComponent } from './sunburst-sequence-renderer.component';

describe('SunburstSequenceRendererComponent', () => {
  let component: SunburstSequenceRendererComponent;
  let fixture: ComponentFixture<SunburstSequenceRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SunburstSequenceRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SunburstSequenceRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
