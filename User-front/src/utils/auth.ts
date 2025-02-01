export interface User {
    id?: number;
    username: string;
    email: string;
    fullName: string;
    role: 'ADMIN' | 'USER';
    active: boolean;
    password?: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}