import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquotaEntrepriseComponent } from './addquota-entreprise.component';

describe('AddquotaEntrepriseComponent', () => {
  let component: AddquotaEntrepriseComponent;
  let fixture: ComponentFixture<AddquotaEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddquotaEntrepriseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddquotaEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
