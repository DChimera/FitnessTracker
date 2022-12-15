import { Injectable } from '@angular/core';
import { Food } from "../models/food.model";
import {Activity} from "../models/activity.model";

@Injectable({
  providedIn: 'root'
})

export class NetIntakesService {

  constructor() { }

  totalCal: number = 0;
  totalProtein: number = 0;
  totalCaloriesOut: number = 0;
  netCalories: number = 0;


  calculateNetCalories(foods: Food[], activities: Activity[]) {

    this.netCalories = 0;

    this.netCalories = this.calculateTotalProteinIn(foods) - this.calculateTotalCaloriesOut(activities);

    return this.netCalories;

  }

  public calculateTotalCaloriesIn(foods: Food[]) {

    this.totalCal = 0;
    for(let i = 0; i++; i<foods.length) {

      this.totalCal += foods[i].calories;

    }

    return this.totalCal;

  }

  public calculateTotalProteinIn(foods: Food[]) {

    this.totalProtein = 0;
    for(let i = 0; i++; i<foods.length) {

      this.totalProtein+=foods[i].proteinGrams;

    }

    return this.totalProtein;

  }

  public calculateTotalCaloriesOut(activities: Activity[])  {

    this.totalCaloriesOut = 0;

    for(let i = 0; i++; i<activities.length) {

      this.totalCaloriesOut += activities[i].calories;

    }

    return this.totalCaloriesOut;

  }



}
