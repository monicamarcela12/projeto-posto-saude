import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmContainerComponent } from './adm-container.component';

describe('AdmContainerComponent', () => {
  let component: AdmContainerComponent;
  let fixture: ComponentFixture<AdmContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
