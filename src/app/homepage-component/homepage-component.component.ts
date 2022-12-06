import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-component',
  templateUrl: './homepage-component.component.html',
  styleUrls: ['./homepage-component.component.css']
})
export class HomepageComponentComponent implements OnInit{

  user: string = "";
  gender: string = "";
  height: string= "";
  weight: string= "";
  goalWeight: string= "";
  netCaloriesTarget: string ="";
  goalProteinIntake: string = "";
  currentDate = Date.now();
  caloriesIn: string = "";
  caloriesOut: string = "";
  proteinIn: string = "";
  netCalories: string = "";





  ngOnInit(): void {

    this.user = "TO BE IMPLEMENTED";

  }



}
