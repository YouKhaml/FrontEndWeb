import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAdminEntrepriseComponent } from './liste-admin-entreprise.component';

describe('ListeAdminEntrepriseComponent', () => {
  let component: ListeAdminEntrepriseComponent;
  let fixture: ComponentFixture<ListeAdminEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeAdminEntrepriseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeAdminEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
