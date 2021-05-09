import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocieteEditComponent } from './societe-edit.component';

describe('SocieteEditComponent', () => {
  let component: SocieteEditComponent;
  let fixture: ComponentFixture<SocieteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocieteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocieteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
