import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { DatabaseServiceService } from "../../services/database-service.service";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  users: User[] = [];

  constructor(private database: DatabaseServiceService) { }

  ngOnInit(): void {
    this.database.initDB();
    this.database.selectAllUser()
      .then(data => {
        this.users = data;
      })
      .catch(err => {
        console.error(err);
      });
  }
}
