import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { DatabaseServiceService } from "../../services/database-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  users: User[] = [];

  constructor(private database: DatabaseServiceService,
              private router: Router) { }

  ngOnInit(): void {
    let activeUser = localStorage.getItem("userId");

    this.database.initDB();
    this.database.selectAllUser()
      .then(data => {
        this.users = data;
      })
      .catch(err => {
        console.error(err);
      });

    if (activeUser !== null)
    {
      this.router.navigate(['home']);
    }
  }
  btnLogin_click(id: any) {
    localStorage.setItem("userId", id);
  }
}
