import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWidgetComponent } from './add-widget.component';

describe('AddWidgetComponent', () => {
  let component: AddWidgetComponent;
  let fixture: ComponentFixture<AddWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
