import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Tab1Page } from "../tab1/tab1.page";

@Component({
  selector: "app-startquiz",
  templateUrl: "./startquiz.page.html",
  styleUrls: ["./startquiz.page.scss"]
})
export class StartquizPage implements OnInit {
  constructor(public navCtrl: NavController) {}

  ngOnInit() {}
  startQuiz() {
    console.log("navigating to stats");
    this.navCtrl.navigateForward("quiz");
  }
  skipQuiz() {
    console.log("navigating to stats");
    this.navCtrl.navigateForward("tabs");
  }
}
