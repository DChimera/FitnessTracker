export class User {
  id: number = -1;
  userName: any = null;
  firstName: any = null;
  lastName: any = null;
  userGender: any = null;
  userHeight: any = null;
  userWeight: any = null;
  userGoalWeight: any = null;
  dateCreated: any = null;

  constructor(userName: string, firstName: string, lastName: string, userGender: string, userHeight: number, userWeight: number, userGoalWeight?: number) {
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userGender = userGender;
    this.userHeight = userHeight;
    this.userWeight = userWeight;
    this.userGoalWeight = userGoalWeight;
    this.dateCreated = String(new Date());
  }
}
