import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsQuotaAdminComponent } from './details-quota-admin.component';

describe('DetailsQuotaAdminComponent', () => {
  let component: DetailsQuotaAdminComponent;
  let fixture: ComponentFixture<DetailsQuotaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsQuotaAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsQuotaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
