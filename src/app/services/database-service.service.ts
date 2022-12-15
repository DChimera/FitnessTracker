import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Food } from '../models/food.model';
import { Activity } from "../models/activity.model";

declare function openDatabase(shortName: string, version: string, displayName: string,
                              dbSize: number, dbCreateSuccess: () => void): any;

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {
  private db: any = null;

  constructor() { }

  private static errorHandler(error: string): any {
    console.error("Error: " + error);
  }

  private createDatabase(): void {
    let shortName = "FitnessTrackerDB";
    let version = "1.0";
    let displayName = "DB for FitnessTracker App";
    let dbSize = 2 * 1024 * 1024;

    this.db = openDatabase(shortName, version, displayName, dbSize, () => {
      console.log("Success: Database created successfully");
    });
  }

  private createTables(): void {
    function txFunction(tx: any): void {
      var options: string[] = [];
      var sql: string = "CREATE TABLE IF NOT EXISTS users(" +
        "userId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
        "userName VARCHAR(40) NOT NULL UNIQUE, " +
        "firstName VARCHAR(40) NOT NULL, " +
        "lastName VARCHAR(40), " +
        "userGender VARCHAR(10), " +
        "userHeight DOUBLE NOT NULL, " +
        "userWeight DOUBLE NOT NULL, " +
        "userGoalWeight DOUBLE NOT NULL, " +
        "dateCreated DATE NOT NULL);";

      tx.executeSql(sql, options, () => {
        console.info("Success: create table users successful");
      }, DatabaseServiceService.errorHandler);

      sql = "CREATE TABLE IF NOT EXISTS food(" +
        " foodId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " foodName VARCHAR(60) NOT NULL," +
        " calories DOUBLE NOT NULL," +
        " fatGrams DOUBLE NOT NULL," +
        " carbGrams DOUBLE NOT NULL," +
        " proteinGrams DOUBLE NOT NULL," +
        " userId INTEGER NOT NULL," +
        " dateEaten DATETIME NOT NULL," +
        " FOREIGN KEY(userId) REFERENCES users(userId));";

      tx.executeSql(sql, options, () => {
        console.info("Success: create table food successful");
      }, DatabaseServiceService.errorHandler);

      sql = "CREATE TABLE IF NOT EXISTS activities(" +
        "activityId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
        "activityName VARCHAR(60) NOT NULL, " +
        "calories INTEGER NOT NULL);";

      tx.executeSql(sql, options, () => {
        console.info("Success: create table activities successful");
      }, DatabaseServiceService.errorHandler);

    }
    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
      console.log("Success: All tables created successfully");
    });
  }

  public selectAllActivities(): Promise<any> {
    let options: string[] = [];
    let activities: Activity[] = [];
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql: string = "SELECT * FROM activities;";
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let activity = new Activity(row['activityName'], row['calories'], row['type']);
              activity.id = row['userId'];
              activities.push(activity);
            }
            resolve(activities);
          } else {
            reject("No users found");
          }
        }, DatabaseServiceService.errorHandler);
      }
      this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
        console.info("Success: select all user records successful");
      });
    });
  }

  public insertUser(user: User, callback: any) {
    function txFunction(tx: any) {
      let sql: string = "INSERT INTO users(userName, firstName, lastName, userGender, userHeight, userWeight, userGoalWeight, dateCreated) VALUES (?,?,?,?,?,?,?,?);";
      let options = [user.userName, user.firstName, user.lastName, user.userGender, user.userHeight, user. userWeight, user.userGoalWeight, user.dateCreated];

      tx.executeSql(sql, options, () => {
        console.info("Success: insert user record successful");
      }, DatabaseServiceService.errorHandler);
    }
    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, callback);
  }

  public insertFood(food: Food, callback: any){
    function txFunction(tx: any) {
      let sql: string = 'INSERT INTO food(foodName, calories, fatGrams, carbGrams, proteinGrams, userId, dateEaten) VALUES (?,?,?,?,?,?,?)';
      let options = [food.foodName, food.calories, food.fatGrams, food.carbGrams, food.proteinGrams, food.userId, food.dateEaten];

      tx.executeSql(sql, options, () => {
        console.info("Success: food user record successful");
      }, DatabaseServiceService.errorHandler);
    }

    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, callback);
  }

  public selectFoodByDate(): Promise<any> {
    let options: string[] = [];
    let foods: Food[] = [];
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM food WHERE dateEaten = CONVERT (date, GETDATE());";
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let pdt = new Food(row['foodName'], row['calories'], row['fatGrams'], row['carbGrams'], row['proteinGrams'], row['dateEaten']);
              pdt.id = row['id'];
              foods.push(pdt);
            }
            resolve(foods);
          }
          else {
            reject("No foods found");
          }
        }, DatabaseServiceService.errorHandler);
      }
      this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
        console.log('Success: selectAll transaction successful');
      });
    });
  }


  public selectAllFood(): Promise<any> {
    let options: string[] = [];
    let foods: Food[] = [];
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM food;";
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let pdt = new Food(row['foodName'], row['calories'], row['fatGrams'], row['carbGrams'], row['proteinGrams'], row['dateEaten'], row['userId']);
              pdt.id = row['id'];
              foods.push(pdt);
            }
            resolve(foods);
          }
          else {
            reject("No foods found");
          }
        }, DatabaseServiceService.errorHandler);
      }
      this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
        console.log('Success: selectAll transaction successful');
      });
    });
  }

  public deleteFood(food: Food, callback: () => void) {
    function txFunction(tx: any) {
      var sql: string = 'DELETE FROM food WHERE id=?;';
      var options = [food.id];
      tx.executeSql(sql, options, callback, DatabaseServiceService.errorHandler);
    }

    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
      console.log('Success: food deleted successfully');
    });
  }


  public insertActivity(activity: Activity, callback: any){
    function txFunction(tx: any) {
      let sql: string = "INSERT INTO activities(activityName, calories, type) VALUES (?, ?, ?)";
      let options = [activity.activityName, activity.calories, activity.type];

      tx.executeSql(sql, options, () => {
        console.info("Success: insert activity record successful");
      }, DatabaseServiceService.errorHandler);
    }

    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, callback);
  }

  public deleteActivity(activity: Activity, callback: () => void) {
    function txFunction(tx: any) {
      var sql: string = 'DELETE FROM activity WHERE id=?;';
      var options = [activity.id];
      tx.executeSql(sql, options, callback, DatabaseServiceService.errorHandler);
    }

    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
      console.log('Success: food deleted successfully');
    });
  }

  public selectActivitiesByDate(): Promise<any> {
    let options: string[] = [];
    let activities: Activity[] = [];
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM food WHERE datePerformed = CONVERT (date, GETDATE());";
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let pdt = new Activity(row['activityId'], row['activityName'], row['calories']);
              pdt.id = row['id'];
              activities.push(pdt);
            }
            resolve(activities);
          }
          else {
            reject("No foods found");
          }
        }, DatabaseServiceService.errorHandler);
      }
      this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
        console.log('Success: selectAll transaction successful');
      });
    });
  }

  public _selectUser(id: number): Promise<any> {
    let options = [id];
    let user: User = new User();
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM users WHERE id=?;";
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            user = new User(row['firstName'], row['lastName'], row['userGender'], row ['userHeight'], row['userWeight'], row['userGoalWeight'], row['dateCreated']);
            user.id = row['userId'];
            resolve(user);
          }
          else {
            reject("No product found");
          }
        }, DatabaseServiceService.errorHandler);
      }
      this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
        console.log('Success: select transaction successful');
      });
    });
  }

  public selectAllUser(): Promise<any> {
    let options: string[] = [];
    let users: User[] = [];
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql: string = "SELECT * FROM users;";
        tx.executeSql(sql, options, (tx: any, results: { rows: string | any[]; }) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let usr = new User(row['userName'], row['firstName'], row['lastName'], row['userGender'], row['userHeight'], row['userWeight'], row['userGoalWeight']);
              usr.id = row['userId'];
              users.push(usr);
            }
            resolve(users);
          } else {
            reject("No users found");
          }
        }, DatabaseServiceService.errorHandler);
      }
      this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
        console.info("Success: select all user records successful");
      });
    });
  }



  public deleteUser(user: User, callback: any) {
    function txFunction(tx: any) {
      let sql: string = "DELETE FROM users WHERE userName=?;";
      let options = [user.userName];

      tx.executeSql(sql, options, () => {
        console.info("Success: delete user record successful");
      }, DatabaseServiceService.errorHandler);
    }
  }

  public updateUser(user: User, callback: any) {
      function txFunction(tx: any) {
        let sql: string = "UPDATE users SET userName=?, firstName=?, lastName=?, userHeight=?, userWeight=?" +
          "userGoalWeight=?;";
        let options = [user.userName, user.firstName, user.lastName, user.userHeight, user.userWeight, user.userGoalWeight];

        tx.executeSql(sql, options, () => {
          console.info("Success: delete user record successful");
        }, DatabaseServiceService.errorHandler);
      }

    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
      console.info(`Success: select ${user.userName}'s user record successful`);
    });
  }

  public initDB(): void {
    if (this.db == null) {
      try {
        this.createDatabase();
        this.createTables();
      } catch (e) {
        console.error("Error in initDB(): " + e);
      }
    }
  }
}
