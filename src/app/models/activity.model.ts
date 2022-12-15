export class Activity{
  id: number = -1;
  activityName: any = null;
  calories: any = null;
  type: any = null;
  userId: any = null;
  datePerformed: any = null;

  constructor(activityName?: string, calories?: number, type?: string){

    this.activityName = activityName;
    this.calories = calories;
    this.type = type;

  }
}

