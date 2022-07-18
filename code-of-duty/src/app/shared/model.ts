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
    username?: string;
    email?: string;
    status?: UserStatus;
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

export enum SiteStatus {
    Open = 'o',
    Completed = 'c'
}

export interface Site {
    id?: number,
    siteId?: string;
    siteName?: string;
    aeId?: Number;
    cewisId?: string;
    status?: SiteStatus;
    createdAt?: number;
    updatedAt?: number;
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

export enum RuleValidationStatus {
    OPEN = "OPEN",
    INPROGRESS = "INPROGRESS",
    FAILED = "FAILED",
    PASS = "PASS",
    FAIL = "FAIL"
}

export interface Rule {
    id?: number;
    title?: string;
    description?: string;
    system?: string;
    endPoint?: string;
    checkType?: string;
    source?: string;
    response?: string;
    query?: string;
    sqlCheckType?: string;
    sqlSource?: string;
    sqlResponse?: string;
    status?: RuleValidationStatus;
}

export interface apiResponse {
    success: boolean;
    message?: string | ErrorMessage[];
    response?: boolean | string;
}
