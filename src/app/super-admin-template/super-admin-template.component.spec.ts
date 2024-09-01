import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminTemplateComponent } from './super-admin-template.component';

describe('SuperAdminTemplateComponent', () => {
  let component: SuperAdminTemplateComponent;
  let fixture: ComponentFixture<SuperAdminTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperAdminTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperAdminTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
