export enum UserRole {
  Admin = 'ROLE_ADMIN',
  Parent = 'ROLE_PARENT',
  Child = 'ROLE_CHILD'
}

export interface User {
  name: string;
  email: string;
  role: UserRole;
}
