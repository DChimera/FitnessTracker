import {Component, OnInit} from "@angular/core";
import {Activity} from "../../models/activity.model";
import {DatabaseServiceService} from "../../services/database-service.service";
import {Router} from "@angular/router";
import {parse} from "@angular/compiler-cli/linker/babel/src/babel_core";

@Component({
  selector: 'app-activity-journal',
  templateUrl: './activity-journal.component.html',
  styleUrls: ['./activity-journal.component.css']
})

export class ActivityJournalComponent implements OnInit {
  objActivity: Activity = new Activity();
  activities: Activity[] = [];
  constructor(private database: DatabaseServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.database.selectAllActivities()
      .then(data=> {
        this.activities=data;
        console.info(data);
      })
      .catch(err =>{
        console.error(err);
      })
  }

  btnDelete_click(activity: any) {
    this.database.deleteActivity(activity, ()=>{
      alert("Activity deleted successfully");
    });
    this.ngOnInit();
  }
}
