import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHomeBannerComponent } from './edit-home-banner.component';

describe('EditHomeBannerComponent', () => {
  let component: EditHomeBannerComponent;
  let fixture: ComponentFixture<EditHomeBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHomeBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHomeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
