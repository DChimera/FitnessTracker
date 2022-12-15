import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user.model";
import { DatabaseServiceService } from "../../services/database-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit{
  Gender: any = ["Male", "Female", "Other"];
  objUser: User = new User("","","","",0,0,0);

  constructor(private database: DatabaseServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.database.initDB();
  }

  btnAdd_click() {
    this.database.insertUser(this.objUser, () => {
      alert("User added.");
      this.router.navigate(['/login']);
    });
  }
}
