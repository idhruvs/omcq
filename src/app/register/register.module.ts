import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { RegisterPage } from "./register.page";
import { AuthenticationService } from "../providers/authentication/authentication.service";

const routes: Routes = [
  {
    path: "",
    component: RegisterPage
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
  declarations: [RegisterPage],
  providers: [AuthenticationService]
})
export class RegisterPageModule {}
