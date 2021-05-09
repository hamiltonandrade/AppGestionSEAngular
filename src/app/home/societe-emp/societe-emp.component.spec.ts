import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocieteEmpComponent } from './societe-emp.component';

describe('SocieteEmpComponent', () => {
  let component: SocieteEmpComponent;
  let fixture: ComponentFixture<SocieteEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocieteEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocieteEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
