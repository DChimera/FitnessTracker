export class Activity{
  id: number = -1;
  activityName: any = null;
  calories: any = null;
  type: any = null;
  userId: any = null;
  datePerformed: any = null;

  constructor(activityName?: string, calories?: number, type?: string, userId?: number, datePerformed?: Date){
    this.activityName = activityName;
    this.calories = calories;
    this.type = type;
    this.userId = userId;
    this.datePerformed = datePerformed;
  }
}

