export class Food{
  id: number = -1;
  foodName: any=null;
  calories: any=null;
  fatGrams: any=null;
  carbGrams: any=null;
  proteinGrams: any=null;
  userId: any=null;
  dateEaten: any=null;

  constructor(name?: string, calories?: number, fatGrams?: number, carbGrams?: number, proteinGrams?: number/*, userId?: number, dateEaten?: Date*/){
    this.foodName = name;
    this.calories = calories;
    this.fatGrams = fatGrams;
    this.carbGrams = carbGrams;
    this.proteinGrams = proteinGrams;
/*    this.userId = userId;
    this.dateEaten = dateEaten;*/
  }
}

