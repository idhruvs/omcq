import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

let apiUrl = "https://parseapi.back4app.com/";
@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
    console.log("Hello AuthServiceProvider Provider");
  }

  post(credentials, endpoint) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      this.http
        .post(apiUrl + endpoint, JSON.stringify(credentials), {
          headers: {
            "X-Parse-Application-Id":
              "IphrIhDKCf8buyK4acb0pRZF54vcJHzLc7NGOPg3",
            "X-Parse-REST-API-Key": "TZLCmxRmCN3US6OV8KCQrpswmBbTiwxquX3tw5i0",
            "Content-Type": "application/json"
          }
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
