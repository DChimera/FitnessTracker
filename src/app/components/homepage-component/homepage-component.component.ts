import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.model";
import {DatabaseServiceService} from "../../services/database-service.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-homepage-component',
  templateUrl: './homepage-component.component.html',
  styleUrls: ['./homepage-component.component.css']
})



export class HomepageComponentComponent implements OnInit{

  constructor(private router: Router,
              private database:DatabaseServiceService)
  {   }

  user: any = null;

  currentDate = Date.now();

  /*



  TO BE DONE IN CALCULATE GOAL SERVICE

  netCaloriesTarget: string ="";
  goalProteinIntake: string = "";

   */

  /*



  TO BE DONE IN CALCULATE NET SERVICE TABLE

  caloriesIn: string = "";
  caloriesOut: string = "";
  proteinIn: string = "";
  netCalories: string = "";

   */

  ngOnInit(): void {

    let id: number;
    id = parseInt(localStorage.getItem('id')||"");

      this.database._selectUser(id)
        .then((data: any) => {

          this.user = data;

        }).catch((e: any) => {

        console.error(e);

      });

  }


}
