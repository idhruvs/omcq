import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.page.html",
  styleUrls: ["./quiz.page.scss"]
})
export class QuizPage implements OnInit {
  constructor(public navCtrl: NavController) {}

  ngOnInit() {}

  terminateQuiz() {
    this.navCtrl.navigateRoot("");
  }
}
