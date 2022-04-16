export interface UserInterface {
  username: string;
  fName: string;
  lName: string;
  email: string;
  password: string;
  dateCreated: Date;
}

export class User implements UserInterface {
  username: string = '';
  fName: string = '';
  lName: string = '';
  email: string = '';
  password: string = '';
  dateCreated: Date = new Date();
  pointsOnTeam?: number;

  public static getInitials(user: User) {
    return (user.fName.charAt(0) + user.lName.charAt(0)).toUpperCase();
  }
}
