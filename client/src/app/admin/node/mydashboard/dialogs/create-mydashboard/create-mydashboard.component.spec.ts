import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMydashboardComponent } from './create-mydashboard.component';

describe('CreateMydashboardComponent', () => {
  let component: CreateMydashboardComponent;
  let fixture: ComponentFixture<CreateMydashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMydashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
