export class User {
  userName: any = null;
  firstName: any = null;
  lastName: any = null;
  userHeight: any = null;
  userWeight: any = null;
  dateCreated: any = null;

  constructor(userName: string, firstName: string, lastName: string, userHeight: number, userWeight: number) {
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userHeight = userHeight;
    this.userWeight = userWeight;
    this.dateCreated = String(new Date());
  }
}
