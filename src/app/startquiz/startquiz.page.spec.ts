import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartquizPage } from './startquiz.page';

describe('StartquizPage', () => {
  let component: StartquizPage;
  let fixture: ComponentFixture<StartquizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartquizPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartquizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
