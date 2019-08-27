import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterRendererComponent } from './counter-renderer.component';

describe('CounterRendererComponent', () => {
  let component: CounterRendererComponent;
  let fixture: ComponentFixture<CounterRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
