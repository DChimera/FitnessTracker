import {Component, OnInit} from "@angular/core";
import {Activity} from "../../models/activity.model";
import {DatabaseServiceService} from "../../services/database-service.service";

@Component({
  selector: 'app-activity-journal',
  templateUrl: './activity-journal.component.html',
  styleUrls: ['./activity-journal.component.css']
})

export class ActivityJournalComponent implements OnInit {
  constructor(private database: DatabaseServiceService) {
  }

  ngOnInit(): void {
    this.database.initDB();
  }

  btnAdd_click() {
    this.database.insertActivity(this.objActivity, () => (
      console.log("Activity record added successfully")
    ));
    alert("Record added successfully");
  }
  objActivity: Activity = new Activity("",-1,"", -1);
}
