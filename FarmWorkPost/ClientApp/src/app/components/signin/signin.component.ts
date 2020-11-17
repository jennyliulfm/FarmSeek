import { Component, OnInit } from "@angular/core";
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from "angularx-social-login";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user/user.service";
import { AppUser } from "src/app/models/model";
import { Router } from "@angular/router";


@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  private currentUser: SocialUser;

  constructor(
    private toasterService: ToastrService,
    private authService: SocialAuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}

  /**
   * Login with google
   */
  signInWithGoogle(): void {
    console.log("login wiht google");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.registerSocialUser();
  }

  /**
   * Log in with FB
   */
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.registerSocialUser();
  }

  /**
   *
   */
  /**
   * Get loggined social media user
   */
  registerSocialUser() {
    this.authService.authState.subscribe(
      (res) => {
        this.currentUser = res;
       

        const args: AppUser = {
          UserId: this.currentUser.id,
          FirstName: this.currentUser.firstName,
          LastName: this.currentUser.lastName,
          Email: this.currentUser.email,
        };
        this.userService.registerSocialUser(args).subscribe(
          (res) => {
            this.toasterService.success(`You have successfully login`);
            localStorage.setItem("token", res.token);
            console.log(res.token);
            console.log(localStorage.getItem("token"));
            this.router.navigateByUrl('home');
          },
          (err) => {
            this.toasterService.error(`${err.error.message}`)
            console.error("ERROR: GetCurrentUser", err);
          }
        );
      },

      (err) => {
        console.log("ERROR: GetSocialUser Failed");
      }
    );
  }
}
