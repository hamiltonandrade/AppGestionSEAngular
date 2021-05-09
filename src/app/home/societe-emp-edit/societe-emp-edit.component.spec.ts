import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocieteEmpEditComponent } from './societe-emp-edit.component';

describe('SocieteEmpEditComponent', () => {
  let component: SocieteEmpEditComponent;
  let fixture: ComponentFixture<SocieteEmpEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocieteEmpEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocieteEmpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
