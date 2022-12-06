import { Component, OnInit} from '@angular/core';
import {FoodserviceService} from "../services/foodservice.service";
import {Food} from "../models/food.model";
@Component({
  selector: 'app-food-journal',
  templateUrl: './food-journal.component.html',
  styleUrls: ['./food-journal.component.css']
})
export class FoodJournalComponent implements OnInit{
  foodJournal: Food[] | undefined;

  constructor(private foodservice: FoodserviceService) {
  }
  ngOnInit(): void {
    this.foodJournal=this.foodservice.getFoodJournal();
    for(let mFood of this.foodJournal){
      console.log(mFood.foodName)
    }
  }


}
