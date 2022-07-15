import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSiteComponent } from './add-edit-site.component';

describe('AddEditRoleComponent', () => {
  let component: AddEditSiteComponent;
  let fixture: ComponentFixture<AddEditSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
