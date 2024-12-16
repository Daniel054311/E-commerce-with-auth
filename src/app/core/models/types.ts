export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    role: string;
  }



  export interface LoginResponse {
    message: string;
    token: string;
    refreshToken: string;
    user: User;
  }

  export interface DecodedToken {
    exp: number;
    iat: number;

}


