import { Injectable } from '@angular/core';
import { Activity } from '../models/activity.model';
import { Food } from '../models/food.model';
import { User } from '../models/user.model';

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
      var sql: string = "CREATE TABLE IF NOT EXISTS activities(" +
        " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " name VARCHAR(20) NOT NULL," +
        " price DOUBLE);";

      tx.executeSql(sql, options, () => {
        console.info("Success: create table successful");
      }, DatabaseServiceService.errorHandler);


    }
    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
      console.log("Success: Table creation transaction successful");
    });
  }

  public insertActivity(activity: Activity, callback: any) {
    function txFunction(tx: any) {
      let sql: string = "INSERT INTO products(name, price) VALUES (?,?)";
      let options = [activity.prodName, activity.price];

      tx.executeSql(sql, options, () => {
        console.info("Success: insert activity record successful");
      }, DatabaseServiceService.errorHandler);
    }

    this.db.transaction(txFunction, DatabaseServiceService.errorHandler, () => {
      console.info("Success: insert activity record successful");
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
