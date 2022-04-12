export enum UserType {
  EMPLOYEE = 'Employee',
  MANAGER = 'Manager',
}

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dateCreated: Date;
  userType: UserType;
}
