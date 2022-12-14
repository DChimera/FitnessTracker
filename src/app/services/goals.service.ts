import { Injectable } from '@angular/core';
import {DatabaseServiceService} from "./database-service.service";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  user: any = null;

  constructor(user: User) {

    this.user=user;

  }

  public calcCalorieGoal() {

    if(this.user.userGender == "Male") {

      return

    } else {



    }

  }

}
