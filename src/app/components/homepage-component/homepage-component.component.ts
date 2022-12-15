import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user.model";
import { Activity } from "../../models/activity.model";
import { DatabaseServiceService } from "../../services/database-service.service";
import { Router } from "@angular/router";
import { NetIntakesService } from "../../services/net-intakes.service";
import { GoalsService } from "../../services/goals.service";


@Component({
  selector: 'app-homepage-component',
  templateUrl: './homepage-component.component.html',
  styleUrls: ['./homepage-component.component.css']
})



export class HomepageComponentComponent implements OnInit{

  constructor(private router: Router,
              private database:DatabaseServiceService,
              private goalsService:GoalsService,
              private netIntakes:NetIntakesService
              )
  {   }

  user: any = null;
  foods: any[] = [];
  activities: any[] = [];

  currentDate = Date.now();

  netCaloriesTarget: number = this.goalsService.calcNetCalorieGoal(this.user.userGoalWeight, this.user.currentWeight,
    this.user.currentHeight, this.user.userGender);
  goalProteinIntake: number = this.goalsService.calcProteinGoals(this.user.userWeight);

  caloriesIn = this.netIntakes.calculateTotalCaloriesIn(this.foods);
  caloriesOut = this.netIntakes.calculateTotalCaloriesOut(this.activities);
  proteinIn = this.netIntakes.calculateTotalProteinIn(this.foods)
  netCalories = this.netIntakes.calculateNetCalories(this.foods, this.activities)

  ngOnInit(): void {

    let id: number;
    id = parseInt(localStorage.getItem('id')||"");

    this.database._selectUser(id)
      .then((data: any) => {

        this.user = data;

      }).catch((e: any) => {
        console.error(e);
      });

      this.database.selectFoodByDate()
        .then((data: any)=> {

          this.foods = data;

        }).catch((e: any)=> {
        console.error(e);
        });

    this.database.selectActivitiesByDate()
      .then((data: any)=> {

        this.activities = data;

      }).catch((e: any)=> {
      console.error(e);
    });

  }


}
