import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuotaAdminComponent } from './edit-quota-admin.component';

describe('EditQuotaAdminComponent', () => {
  let component: EditQuotaAdminComponent;
  let fixture: ComponentFixture<EditQuotaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditQuotaAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQuotaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
