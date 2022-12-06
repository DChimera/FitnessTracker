import {Component, OnInit} from '@angular/core';
import {FoodserviceService} from "../../services/foodservice.service";
import {Food} from "../../models/food.model";
import {DatabaseServiceService} from "../../services/database-service.service";

@Component({
  selector: 'app-food-journal',
  templateUrl: './food-journal.component.html',
  styleUrls: ['./food-journal.component.css']
})
export class FoodJournalComponent implements OnInit {
  constructor(private database: DatabaseServiceService) {
  }

  ngOnInit(): void {
    this.database.initDB();
  }

  btnAdd_click() {
    this.database.insertFood(this.objFood, () => (
      console.log("Food record added successfully")
    ));
    alert("Record added successfully");
  }
  objFood: Food = new Food();
}

