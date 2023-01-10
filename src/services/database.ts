import * as mongoose from "mongoose";

import config from "../config/db.config";

export default class Database {
  private static instance: Database;
  private isConnected: boolean = false;
  private constructor() { }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public async disconnect() {
    if (!this.isConnected) {
      console.log("no connection");
      return;
    }
    await mongoose.disconnect();
    this.isConnected = false;
    console.log("mongodb is disconnected");
  }

  /**
     * Connects database
     * @returns Promise<mongoose.Connection>
     */
  public async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }
    mongoose.set("strictQuery", false);
    return new Promise((resolve, reject) => {
      mongoose.connect(config.url, (err) => {
        if (err) { 
          this.isConnected = false;
          reject(err); 
        }
        else {
          console.log("mongdb is connected");
          this.isConnected = true;
          resolve();
        }
      });
    });
  }
}