import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCloudRendererComponent } from './word-cloud-renderer.component';

describe('WordCloudRendererComponent', () => {
  let component: WordCloudRendererComponent;
  let fixture: ComponentFixture<WordCloudRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordCloudRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCloudRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
