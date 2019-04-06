import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationService } from "../providers/authentication/authentication.service";

import { IonicModule } from "@ionic/angular";

import { QuizPage } from "./quiz.page";

const routes: Routes = [
  {
    path: "",
    component: QuizPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuizPage],
  providers: [AuthenticationService]
})
export class QuizPageModule {}
