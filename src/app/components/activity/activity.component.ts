import {Component, OnInit} from '@angular/core';
import {FoodserviceService} from "../../services/foodservice.service";
import {Activity} from "../../models/activity.model";
import {DatabaseServiceService} from "../../services/database-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  objActivity: Activity = new Activity("",0,"");

  constructor(private database: DatabaseServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.database.initDB();
  }

  btnAdd_click() {
    this.database.insertActivity(this.objActivity, () => {
      alert("Activity added.");
    });
  }
}
