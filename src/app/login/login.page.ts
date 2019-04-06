import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AuthenticationService } from "../providers/authentication/authentication.service";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.checkLogin();
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.email],
      password: ["", Validators.required]
    });
  }

  checkLogin() {
    const user = localStorage.getItem("user");
    if (user) {
      console.log("user already logged in");
      this.navCtrl.navigateRoot("");
    }
  }

  login() {
    console.log("Initiating Login");
    try {
      this.authService.get(this.loginForm.value, "login").then((res: any) => {
        this.navCtrl.navigateForward("");
        if (res.status === 401) {
          this.invokeToast("Invalid username or password");
        } else {
          this.invokeToast("Login Successful");
          localStorage.setItem("user", JSON.stringify(res));
        }
      });
    } catch (e) {
      this.invokeToast("Network Error. Please Try again!");
    }
  }

  async invokeToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "top"
    });
    return await toast.present();
  }

  gotoRegister() {
    console.log("Navigating to register");
    this.navCtrl.navigateForward("register");
  }
}
