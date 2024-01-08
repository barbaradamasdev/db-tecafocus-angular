import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerButtonComponent } from './banner-button.component';

describe('BannerButtonComponent', () => {
  let component: BannerButtonComponent;
  let fixture: ComponentFixture<BannerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
