import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquotaAdminComponent } from './addquota-admin.component';

describe('AddquotaAdminComponent', () => {
  let component: AddquotaAdminComponent;
  let fixture: ComponentFixture<AddquotaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddquotaAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddquotaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
