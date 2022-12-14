import {Component, OnInit} from '@angular/core';
import {FoodserviceService} from "../../services/foodservice.service";
import {Food} from "../../models/food.model";
import {DatabaseServiceService} from "../../services/database-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-food-journal',
  templateUrl: './food-journal.component.html',
  styleUrls: ['./food-journal.component.css']
})
export class FoodJournalComponent implements OnInit {
  objFood: Food = new Food();
  foods: Food[] = [];
  constructor(private database: DatabaseServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.database.selectAllFood()
      .then(data=> {
        this.foods=data;
        console.info(data);
      })
      .catch(err =>{
        console.error(err);
      })
  }

  btnAdd_click() {
    this.database.insertFood(this.objFood, () => (
      console.log("Food record added successfully")
    ));
    alert("Record added successfully");
  }
  btnDelete_click(food: any){
    this.database.deleteFood(food, ()=>{
    alert("Food deleted successfully.");
    });
  }
}

