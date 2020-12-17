import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeBannerComponent } from './add-home-banner.component';

describe('AddHomeBannerComponent', () => {
  let component: AddHomeBannerComponent;
  let fixture: ComponentFixture<AddHomeBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
