import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

let serviceUrl = "https://hackforsweden.herokuapp.com/api/";
let apiUrl = "https://parseapi.back4app.com/";
@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
    console.log("Hello AuthServiceProvider Provider");
  }

  getQuestion() {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      this.http
        .get(apiUrl + "classes/questions", {
          headers: {
            "X-Parse-Application-Id":
              "IphrIhDKCf8buyK4acb0pRZF54vcJHzLc7NGOPg3",
            "X-Parse-REST-API-Key": "TZLCmxRmCN3US6OV8KCQrpswmBbTiwxquX3tw5i0",
            "Content-Type": "application/json"
          }
        })
        .subscribe(
          res => {
            console.log(res);
            resolve(res);
          },
          err => {
            if (err.status === 404) {
              resolve(err);
            }
          }
        );
    });
  }

  get(params, endpoint) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      this.http
        .get(apiUrl + endpoint, {
          headers: {
            "X-Parse-Application-Id":
              "IphrIhDKCf8buyK4acb0pRZF54vcJHzLc7NGOPg3",
            "X-Parse-REST-API-Key": "TZLCmxRmCN3US6OV8KCQrpswmBbTiwxquX3tw5i0",
            "Content-Type": "application/json"
          },
          params: params
        })
        .subscribe(
          res => {
            console.log(res);
            resolve(res);
          },
          err => {
            if (err.status === 404) {
              resolve(err);
            }
          }
        );
    });
  }

  post(credentials, endpoint, useServiceUrl?) {
    let url = apiUrl;
    if (useServiceUrl) {
      url = serviceUrl;
    }
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      this.http
        .post(url + endpoint, JSON.stringify(credentials), {
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
