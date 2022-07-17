import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { AddEditUserComponent } from "src/app/users/add-edit-user/add-edit-user.component";
import { RolesService } from "../roles/roles.service";
import { AddEditRoleComponent } from "./add-edit-role.component";

describe('AddEditRoleComponent - When add a new role', () => {
  let component: AddEditRoleComponent;
  let fixture: ComponentFixture<AddEditRoleComponent>;
  let rolesService: RolesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditUserComponent],
      imports: [MatDialogModule, MatSnackBarModule, HttpClientModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { role: null }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddEditRoleComponent);
    component = fixture.componentInstance;
    rolesService = TestBed.inject(RolesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check the initial role form values', () => {
    const roleForm = component.roleForm;
    const roleFormValues = {
      role: '',
      description: ''
    };
    expect(roleForm.value).toEqual(roleFormValues);
  });
});

describe('AddEditRoleComponent - When edit role', () => {
  let component: AddEditRoleComponent;
  let fixture: ComponentFixture<AddEditRoleComponent>;
  let rolesService: RolesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditUserComponent],
      imports: [MatDialogModule, MatSnackBarModule, HttpClientModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { role: { id: 1, role: 'Administrator', description: 'has all access' } }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddEditRoleComponent);
    component = fixture.componentInstance;
    rolesService = TestBed.inject(RolesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a role by given id', () => {
    const fetchRolesSpy = spyOn(rolesService, 'getRole').and.returnValue(of({ id: 1, role: 'Administrator', description: 'has all access' }));
    component.fetchRole();
    expect(fetchRolesSpy).toHaveBeenCalled();
  });
});
