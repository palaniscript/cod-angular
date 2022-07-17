import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Role } from 'src/app/shared/model';
import { environment } from 'src/environments/environment';
import { RolesService } from './roles.service';

const mockRoles = [
    {
        id: 1,
        role: 'admin',
        description: 'desc'
    }
];

describe('RolesService', () => {
    let service: RolesService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(RolesService);
        httpController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should getRoles without queryParam', () => {
        service.getRoles().subscribe((res) => {
            expect(res).toEqual(mockRoles);
        });
    });

    it('should getRoles with queryParam', () => {
        service.getRoles('admin').subscribe((res) => {
            expect(res).toEqual(mockRoles);
        });
    });

    it('should getRole by id', () => {
        service.getRole(1).subscribe((res) => {
            expect(res).toEqual(mockRoles[0]);
        });
    });

    it('should updateRole and return the updated role from the API', () => {
        const updatedRole: Role = {
            id: 1,
            role: 'Field Engineer',
            description: 'Field Engineer has less permissions than the admin',
        };
        service.updateRole(updatedRole, { id: 1 }).subscribe((data) => {
            expect(data).toEqual(updatedRole);
        });
        const req = httpController.expectOne({
            method: 'PUT',
            url: environment.apiUrl + 'roles/' + updatedRole.id,
        });
        req.flush(updatedRole);
    });

    it('should createRole and return the created role from the API', () => {
        const roleTpCreate: Role = {
            id: 1,
            role: 'Field Engineer',
            description: 'Field Engineer has less permissions than the admin',
        };
        service.createRole(roleTpCreate).subscribe((data) => {
            expect(data).toEqual(roleTpCreate);
        });
        const req = httpController.expectOne({
            method: 'POST',
            url: environment.apiUrl + 'roles',
        });
        req.flush(roleTpCreate);
    });
});
