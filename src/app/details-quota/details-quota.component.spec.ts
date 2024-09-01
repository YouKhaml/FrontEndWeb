import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsQuotaComponent } from './details-quota.component';

describe('DetailsQuotaComponent', () => {
  let component: DetailsQuotaComponent;
  let fixture: ComponentFixture<DetailsQuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsQuotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsQuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
