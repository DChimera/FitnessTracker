export class activity{
  activityName: any=null;
  calories: any=null;
  type:any=null;
  activityId: number = -1;
  constructor(activityName?: string, calories?:, type?: string, activityId: number){
    this.activityName = activityName;
    this.calories = calories;
    this.type = type;
    this.activityId = activityId;

  }
}

