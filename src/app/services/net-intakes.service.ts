import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NetIntakesService {

  constructor() { }

  calculateNetCalories(caloriesIn: number, caloriesOut: number) {

    return caloriesIn - caloriesOut;

  }



}
