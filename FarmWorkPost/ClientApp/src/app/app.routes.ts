import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { SigninComponent } from "./components/signin/signin.component";
import { PostjobComponent } from "./components/postjob/postjob.component";

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'signin', component: SigninComponent },
    { path: 'post-jobs', component: PostjobComponent },
  ]