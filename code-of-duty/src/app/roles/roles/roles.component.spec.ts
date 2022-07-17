import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AddEditRoleComponent } from '../add-edit-role/add-edit-role.component';
import { RolesComponent } from './roles.component';
import { RolesService } from './roles.service';

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;
  let rolesService: RolesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolesComponent],
      imports: [MatDialogModule, HttpClientModule, MatSnackBarModule, MatPaginatorModule, BrowserAnimationsModule, MatIconModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();

    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    rolesService = TestBed.inject(RolesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load roles', () => {
    const loadRolesSpy = spyOn(rolesService, 'getRoles').and.returnValue(of([{ id: 1, role: 'role', description: 'desc' }]));
    component.loadRoles();
    expect(loadRolesSpy).toHaveBeenCalled();
  });

  it('should call addNewRole', () => {
    let addNewRoleSpy = spyOn(component['dialog'], 'open').and.returnValue({ afterClosed: () => of({ response: true }) } as MatDialogRef<typeof AddEditRoleComponent>);
    component.addNewRole();
    expect(addNewRoleSpy).toHaveBeenCalled();
  });

  it('should call editRole', () => {
    let editRoleSpy = spyOn(component['dialog'], 'open').and.returnValue({ afterClosed: () => of({ response: true }) } as MatDialogRef<typeof AddEditRoleComponent>);
    component.editRole({ id: 1, role: 'Administrator', description: 'Can have all access' });
    expect(editRoleSpy).toHaveBeenCalled();
  });

  it('should call deleteRole', () => {
    let deleteRoleSpy = spyOn(component['dialog'], 'open').and.returnValue({ afterClosed: () => of({ response: true }) } as MatDialogRef<typeof AddEditRoleComponent>);
    component.deleteRole({ id: 1, role: 'Administrator', description: 'Can have all access' });
    expect(deleteRoleSpy).toHaveBeenCalled();
  });

  it('should delete role', () => {
    const deleteRoleSpy = spyOn(rolesService, 'deleteRole').and.returnValue(of({ id: 1, role: 'role', description: 'desc' }));
    component['delete']({ id: 1, role: 'Administrator', description: 'Can have all access' });
    expect(deleteRoleSpy).toHaveBeenCalled();
  });

});
