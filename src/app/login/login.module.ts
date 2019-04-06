import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationService } from "../providers/authentication/authentication.service";
import { IonicModule } from "@ionic/angular";

import { LoginPage } from "./login.page";

const routes: Routes = [
  {
    path: "",
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
  providers: [AuthenticationService]
})
export class LoginPageModule {}
