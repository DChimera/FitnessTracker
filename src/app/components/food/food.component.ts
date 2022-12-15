import {Component, OnInit} from '@angular/core';
import {FoodserviceService} from "../../services/foodservice.service";
import {Food} from "../../models/food.model";
import {DatabaseServiceService} from "../../services/database-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  objFood: Food = new Food("",0,0,0,0);

  constructor(private database: DatabaseServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.database.initDB();
  }

  btnAdd_click() {
    this.database.insertFood(this.objFood, () => {
      alert("Food added.");
      this.router.navigate(['/food']);
    });
  }
}
