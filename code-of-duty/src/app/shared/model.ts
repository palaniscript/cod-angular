export interface ErrorMessage {
    value?: string | number;
    msg?: string;
    param?: string;
    location?: string;
}

export interface User {
    id?: number;
    password?: string;
    accessToken?: string;
    role?: number;
    roleName?: string;
    image?: string;
    mobile?: number;
    name?: string;
    email?: string;
    notes?: string;
    created?: number;
    modified?: number;
}

export interface Role {
    id?: number,
    role?: string;
    description?: string;
    created?: number;
    modified?: number;
}

export interface Rule {
    id?: number,
    title?: string,
    description?: string,
    system?: string,
    endPoint?: string,
    checkType?: string,
    source?: string,
    response?: string
}

export interface apiResponse {
    success: boolean;
    message?: string | ErrorMessage[];
    response?: boolean | string;
}

export interface UsersResponse extends apiResponse {
    data?: User[]
}

export interface UserResponse extends apiResponse {
    role: any;
    data?: User
}

export interface RolesResponse extends apiResponse {
    data?: Role[]
}

export interface LoginResponse extends apiResponse {
    accessToken?: string;
    refreshToken?: string;
}

export interface SettingsResponse extends apiResponse {

}
export interface Site {
    id?: number,
    siteId?:string,
    siteName?: string;
    cewisId?: string;
    status?: string;
}