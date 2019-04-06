import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AuthenticationService } from "../providers/authentication/authentication.service";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.email],
      password: ["", Validators.required],
      name: ["", Validators.required],
      schoolName: ["", Validators.required]
    });
  }

  register() {
    console.log(this.registerForm.value);
    try {
      this.authService.post(this.registerForm.value, "users").then(res => {
        console.log(res);
        this.invokeToast();
        this.terminateRegistration();
      });
    } catch (e) {}
  }

  async invokeToast() {
    let toast = await this.toastCtrl.create({
      message: "Registration Successfull",
      duration: 2000,
      position: "middle"
    });
    return await toast.present();
  }

  terminateRegistration() {
    this.navCtrl.navigateRoot("login");
  }
}
