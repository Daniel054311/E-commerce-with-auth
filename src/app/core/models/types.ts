export interface User {  
    id: string;  
    firstName: string;  
    lastName: string;  
    email: string;  
    password: string; 
    isAdmin: boolean; 
    userRole: userRole; 
  }  

  export interface userRole {  
    id: string;  
    name: string;
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


  