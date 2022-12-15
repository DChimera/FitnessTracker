import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user.model";
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

export class HomepageComponentComponent implements OnInit {

  constructor(private router: Router,
              private database: DatabaseServiceService,
              private goalsService: GoalsService,
              private netIntakes: NetIntakesService
  ) {
  }

  user: User[] = [];
  foods: any[] = [];
  activities: any[] = [];
  id: number = -1;

  date: Date = new Date();
  currentDate: string = this.date.toDateString();

  netCaloriesTarget: number = -1;
  goalProteinIntake: number = -1;

  caloriesIn: number = -1;
  caloriesOut: number = -1;
  proteinIn: number = -1;
  netCalories: number = -1;

  ngOnInit(): void {
    this.database.initDB();

    let tempId: any = localStorage.getItem('userId') || '1';
    this.id = parseInt(tempId);
    console.log(this.currentDate);

    this.database.selectAllUser()
      .then((data: any) => {
        this.user = data;
      }).catch((e: any) => {
      console.error(e);
    });

    /*      this.database.selectFoodByDate()
            .then((data: any)=> {

              this.foods = data;

            }).catch((e: any)=> {
            console.error(e);
            });*/

    /*
    this.database.selectActivitiesByDate()
      .then((data: any)=> {
        this.activities = data;
      }).catch((e: any)=> {
      console.error(e);

    });
  */
    console.log(this.user);
    this.netCaloriesTarget = this.goalsService.calcNetCalorieGoal(
      this.user[this.id].userGoalWeight, this.user[this.id].userWeight, this.user[this.id].userHeight, this.user[this.id].userGender);
    this.goalProteinIntake = this.goalsService.calcProteinGoals(this.user[this.id].userWeight);

    /*
    this.caloriesIn = this.netIntakes.calculateTotalCaloriesIn(this.foods);
    this.caloriesOut = this.netIntakes.calculateTotalCaloriesOut(this.activities);
    this.proteinIn = this.netIntakes.calculateTotalProteinIn(this.foods)
    this.netCalories = this.netIntakes.calculateNetCalories(this.foods, this.activities)
    */


  }

  btnChangeWeight_click() {
    this.user[this.id].userWeight = $("#txtWeight").val();
    this.database.updateUser(this.user[this.id], () => {
      console.info("Weight updated successfully");
    });
    this.ngOnInit();
  }

  btnLogout_click() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
