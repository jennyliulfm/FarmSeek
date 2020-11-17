import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppUser } from "src/app/models/model";

interface UserForm {
  firsname: string;
  lastname: string;
  email: string;
  password: string;
}

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  public userFormGroup: FormGroup = this.fb.group({
    firstname: ["", Validators.required],
    lastname: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  /**
   * to get job model value
   */
  get userFormGroupValue(): UserForm {
    return this.userFormGroup.value;
  }

  /**
   * onSubmit()
   */
  onSubmit() {
    const args: AppUser = {
      FirstName: this.userFormGroupValue.firsname,
      LastName: this.userFormGroupValue.lastname,
      Email: this.userFormGroupValue.email,
    };
  }
}
