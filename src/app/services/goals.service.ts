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

    var goalCal = 0;
    //A persons gender will affect their basal metabolic rate,
    //so we determine if the user is male or female
    if(gender == "Male") {

      //If the user is trying to gain weight, they should be seeking to exceed
      //Their maintenance calorie intake
      if(goalWeight >= currentWeight) {

        // This is the basal metabolic rate, plus 750. Net caloric intake must
        // exceed this to gain weight at ~1 pound a day
        goalCal = (88.362 + (13.397 * currentWeight) + (4.799 * currentHeight))+750;
        return goalCal;

        //If the user is trying to lose weight, they must eat less than
        //their maintenance
      } else {

        // This is the basal metabolic rate minus 500. Net caloric intake must
        // be below this to lose weight at ~1 pound a week
        goalCal = (88.362 + (13.397 * currentWeight) + (4.799 * currentHeight))-500;
        return goalCal;
      }

    } else {

      if(goalWeight > currentWeight) {

        goalCal = 447.593 + (9.247 * currentWeight) + (3.098 * currentHeight)-750;
        return goalCal;

      } else {

        goalCal = 447.593 + (9.247 * currentWeight) + (3.098 * currentWeight)-500;
        return goalCal;

      }

    }

  }

// To maintain or gain muscle, it's generally recommended to consume ~2 grams of
// protein per weight in KG
  public calcProteinGoals(currentWeight: number) {

    let goalPro = 0;
    goalPro = 2 * currentWeight;
    return goalPro;

  }

}
