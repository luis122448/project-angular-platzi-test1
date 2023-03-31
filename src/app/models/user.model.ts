export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role?: 'customer' | 'admin';
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SaveUserDTO extends Omit<User,'id' | 'role'> {}
