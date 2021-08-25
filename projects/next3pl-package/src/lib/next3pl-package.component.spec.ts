import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Next3plPackageComponent } from './next3pl-package.component';

describe('Next3plPackageComponent', () => {
  let component: Next3plPackageComponent;
  let fixture: ComponentFixture<Next3plPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Next3plPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Next3plPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
