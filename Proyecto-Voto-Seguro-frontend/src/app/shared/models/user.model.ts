export interface User {
  Id: string;
  Email: string;
  Fullname: string;
  Role: string;
  CreatedAt: Date;
  IsActive: boolean;
}

export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
  fullName: string;
  role: string;
}
