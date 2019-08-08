import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortRendererComponent } from './cohort-renderer.component';

describe('CohortRendererComponent', () => {
  let component: CohortRendererComponent;
  let fixture: ComponentFixture<CohortRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CohortRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
