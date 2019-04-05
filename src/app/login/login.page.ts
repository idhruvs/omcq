import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  login() {
    console.log("Initiating Login");
  }

  gotoRegister() {
    console.log("Navigating to register");
    this.navCtrl.navigateForward("register");
  }
}
