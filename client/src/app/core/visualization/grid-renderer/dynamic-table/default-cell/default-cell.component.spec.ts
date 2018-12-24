import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCellComponent } from './default-cell.component';

describe('DefaultCellComponent', () => {
  let component: DefaultCellComponent;
  let fixture: ComponentFixture<DefaultCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
