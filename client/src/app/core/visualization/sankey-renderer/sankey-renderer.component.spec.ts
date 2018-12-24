import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SankeyRendererComponent } from './sankey-renderer.component';

describe('SankeyRendererComponent', () => {
  let component: SankeyRendererComponent;
  let fixture: ComponentFixture<SankeyRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SankeyRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SankeyRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
