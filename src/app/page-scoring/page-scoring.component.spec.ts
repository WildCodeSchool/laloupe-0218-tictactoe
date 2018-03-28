import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageScoringComponent } from './page-scoring.component';

describe('PageScoringComponent', () => {
  let component: PageScoringComponent;
  let fixture: ComponentFixture<PageScoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageScoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});