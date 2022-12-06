import { Injectable } from '@angular/core';
import {Food} from "../models/food.model"
@Injectable({
  providedIn: 'root'
})
export class FoodserviceService {

  private foodJournal: Food[] = [];

  public getFoodJournal(){
    return this.foodJournal;
  }

  constructor() { }
}
