import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuotaComponent } from './edit-quota.component';

describe('EditQuotaComponent', () => {
  let component: EditQuotaComponent;
  let fixture: ComponentFixture<EditQuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditQuotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
