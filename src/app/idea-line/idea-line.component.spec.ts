import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaLineComponent } from './idea-line.component';

describe('IdeaLineComponent', () => {
  let component: IdeaLineComponent;
  let fixture: ComponentFixture<IdeaLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeaLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
