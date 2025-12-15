export interface User{
  id:string;
  email:string;
  fullName:string;
  role:string;
  createdAt:Date;
  isActive:boolean;
}

export interface RegisterDto{
  email: string;
  password: string;
  fullName: string;
}

export interface LoginDto{
  email: string;
  password: string;
}

export interface AuthResponse{
  token: string;
  userId: string;
  email: string;
  fullName: string;
  role: string;
}
