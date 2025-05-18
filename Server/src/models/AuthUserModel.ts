export interface CreateUserDto {
    email: string;
    password: string;
    displayName: string;
}

export interface AuthUserModel {
    id: string;
    email: string;
    normalizedEmail: string;
    displayName: string;
    normalizedDisplayName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserInfo {
    id: string;
    displayName: string;
}