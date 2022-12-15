import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user.model";
import { Activity } from "../../models/activity.model";
import { DatabaseServiceService } from "../../services/database-service.service";
import { Router } from "@angular/router";
import { NetIntakesService } from "../../services/net-intakes.service";
import { GoalsService } from "../../services/goals.service";
declare const $: any;


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

  user: User = new User();
  foods: any[] = [];
  activities: any[] = [];
  id: number = -1;

  currentDate = Date.now();

  netCaloriesTarget: number = -1;
  goalProteinIntake: number = -1;

  caloriesIn = -1;
  caloriesOut = -1;
  proteinIn = -1;
  netCalories = -1;

  ngOnInit(): void {
    let tempId: any = localStorage.getItem('userId');
    this.id = parseInt(tempId);

    this.database._selectUser(this.id)
      .then((data:any)=> {

        this.user = data;

      }).catch((e: any)=>{

      console.error(e);

    });

      this.database.selectAllFood()
        .then((data: any)=> {

          this.foods = data;

        }).catch((e: any)=> {
        console.error(e);
        });

    this.database.selectAllActivities()
      .then((data: any)=> {

        this.activities = data;

      }).catch((e: any)=> {
      console.error(e);
    });

    this.netCaloriesTarget = this.goalsService.calcNetCalorieGoal(this.user.userGoalWeight, this.user.userWeight,
      this.user.userHeight, this.user.userGender);
    this.goalProteinIntake = this.goalsService.calcProteinGoals(this.user.userWeight);

    this.caloriesIn = this.netIntakes.calculateTotalCaloriesIn(this.foods);
    this.caloriesOut = this.netIntakes.calculateTotalCaloriesOut(this.activities);
    this.proteinIn = this.netIntakes.calculateTotalProteinIn(this.foods)
    this.netCalories = this.netIntakes.calculateNetCalories(this.foods, this.activities)
  }

  btnChangeWeight_click() {

    this.user.userWeight = $("#txtWeight").val();
    this.database.updateUser(this.user, ()=> {

      console.info("Weight updated successfully");

    });

    this.ngOnInit();

  }

  btnLogout_click() {

    localStorage.clear();
    this.router.navigate(["/login"]);

  }

}
