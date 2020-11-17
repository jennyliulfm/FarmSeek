import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "src/app/models/model";
import { getBaseUrl } from "src/main";

@Injectable({
  providedIn: "root",
})
export class ConfigService {

  private config: AppConfig ;
  
  constructor(private http: HttpClient) {}

  /**
   *
   */
  loadAppConfig() {
    this.http.get<AppConfig>("../config/AppConfig.json").subscribe(
      res => {
        this.config = res;
      },
     err => {
       console.log(err);
     });
    }

     /**
     * 
     */
    getBaseUrl(): string {
      return this.config.baseUrl;
    }

    /**
     * 
     */
    getJobNumber(): number {
      return this.config.jobNumber;
    }
  }  
