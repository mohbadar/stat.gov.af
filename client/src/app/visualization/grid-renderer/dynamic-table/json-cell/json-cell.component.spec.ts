import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonCellComponent } from './json-cell.component';

describe('JsonCellComponent', () => {
  let component: JsonCellComponent;
  let fixture: ComponentFixture<JsonCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
