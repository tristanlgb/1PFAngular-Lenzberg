import { ComponentFixture, TestBed } from '@angular/core/testing';
import { modal1Component } from './modal1.component';

describe('ModalComponent', () => {
  let component: modal1Component;
  let fixture: ComponentFixture<modal1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ modal1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(modal1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
