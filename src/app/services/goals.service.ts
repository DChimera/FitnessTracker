import { Injectable } from '@angular/core';
import {DatabaseServiceService} from "./database-service.service";

@Injectable({
  providedIn: 'root'
})
export class GoalsService {


  constructor() {


  }

  // Calculating calorie goals.
  public calcNetCalorieGoal(goalWeight: number, currentWeight: number, currentHeight: number, gender: string) {

    //A persons gender will affect their basal metabolic rate,
    //so we determine if the user is male or female
    if(gender == "Male") {

      //If the user is trying to gain weight, they should be seeking to exceed
      //Their maintenance calorie intake
      if(goalWeight > currentWeight) {

        // This is the basal metabolic rate, plus 750. Net caloric intake must
        // exceed this to gain weight at ~1 pound a day
        return (88.362 + (13.397 * currentWeight) + (4.799 * currentHeight))+750;

      //If the user is trying to lose weight, they must eat less than
      //their maintenance
      } else {

        // This is the basal metabolic rate minus 500. Net caloric intake must
        // be below this to lose weight at ~1 pound a week
        return (88.362 + (13.397 * currentWeight) + (4.799 * currentHeight))-500;

      }

    } else {

      if(goalWeight > currentWeight) {

        return 447.593 + (9.247 * currentWeight) + (3.098 * currentHeight)

      } else {

        return 447.593 + (9.247 * currentWeight) + (3.098 * currentWeight)

      }

    }

  }

  // To maintain or gain muscle, it's generally recommended to consume ~2 grams of
  // protein per weight in KG
  public calcProteinGoals(currentWeight: number) {

    return 2 * currentWeight;

  }



}
