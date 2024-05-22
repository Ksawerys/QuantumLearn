export interface User {
    email?: string | null,
    name?: string | null,
    second_name?: string | null,
    password?: string | null,
    url_photo?: string | null,
    extension?: string | null,
    roles?: Role[] | null
  }
  
  export interface UserAccess {
    msg?: string;
    token?: string;
    user: User;
    roles: Role[];
  }
  
  export interface Role {
    id:     number;
    name: string;
  }
  
  export interface UserSessionStorage {
    exp: number,
    iat: number,
    roles: Role[]
    uid: number
  }