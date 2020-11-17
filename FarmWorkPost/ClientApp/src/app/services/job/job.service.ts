import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Job } from "src/app/models/model";
import { Observable } from "rxjs";
import { ConfigService } from "../common/config.service";

@Injectable({
  providedIn: "root",
})
export class JobService {
  
  private baseUrl: string ="https://localhost:5001/api";

  constructor(private http: HttpClient, private configService: ConfigService) {
   // this.getBaseURL();
  }

  /**
   * post a new job
   */
  postNewJob(job: Job): Observable<Job> {
    
   // console.log(job); 
    return this.http.post<Job>(this.baseUrl +'/job/PostNewJob', job);
  }


  /**
   * Get BASEURL
   */
  getBaseURL() {
    this.baseUrl = this.configService.getBaseUrl();
  }

  /**
   * get All Jobs
   */
  getJobsByPage() {
  }
}
