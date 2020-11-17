import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { JobService } from "src/app/services/job/job.service";
import { Job } from "src/app/models/model";

interface JobForm {
  title: string;
  location: string;
  description: string;
  salary: number;
  type: string;
}
@Component({
  selector: "app-postjob",
  templateUrl: "./postjob.component.html",
  styleUrls: ["./postjob.component.css"],
})
export class PostjobComponent implements OnInit {
  public jobTypes: Array<string> = [];

  constructor(private fb: FormBuilder, private jobService: JobService) {}

  ngOnInit() {
    this.getJobTypes();
  }

  public jobFormGroup: FormGroup = this.fb.group({
    title: ["", Validators.required],
    location: ["", Validators.required],
    description: ["", Validators.required],
    salary: ["", Validators.required],
    type: ["", Validators.required],
  });

  /**
   * to get job model value
   */
  get jobFormGroupValue(): JobForm {
    return this.jobFormGroup.value;
  }

  /** */
  getJobTypes() {
    this.jobTypes = ["Full Time", "Casual"];
  }

  onSubmit() {
    const args: Job = {
      jobId: 0,
      title: this.jobFormGroupValue.title,
      description: this.jobFormGroupValue.description,
      salary: this.jobFormGroupValue.salary,
      location: this.jobFormGroupValue.location,
      //type: this.jobFormGroupValue.type,
    };

    this.jobService.postNewJob(args).subscribe(
      (res) => {
        console.log(res);
      },

      (err) => {
        console.log(err);
      }
    );
  }

  selectJobType(type: string) {
    
    this.jobFormGroup.controls.type.setValue(type);
  }
}
