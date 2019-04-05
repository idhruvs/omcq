import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AuthenticationService } from "../providers/authentication/authentication.service";
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
    private authService: AuthenticationService
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
        this.terminateRegistration();
      });
    } catch (e) {}
  }

  terminateRegistration() {
    this.navCtrl.navigateRoot("login");
  }
}
