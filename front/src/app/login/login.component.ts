import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public labelStyle:object = {
    'opacity':'0'
  };
  public loadingGif:object = {
    'opacity':'0',
    'display':'none'
  }
  public msgLogin: string;
  private cookieSet:boolean;

  constructor(private _router:Router, private _cookies: CookieService) { }

  ngOnInit() {
    this.cookieSet = this._cookies.check('token_id');
    if (this.cookieSet) {
      this._router.navigateByUrl('/dashboard');
    }
  }

  async login(e){
    this.showLoading();
    let reqAcces = await axios.post('http://localhost:3000/login', {
      'user': e.user,
      'pass': e.pass
    });
    let code = reqAcces.data.code;
    let token = reqAcces.data.token;
    this.hideLoading();

    if (code == "401") {
      this.msgLogin = "User or Password incorrect";
      this.showCredentials();
      this.labelStyle = {'color': 'red'}
    }
    else if (code == "200") {
      this.msgLogin = "Welcome";
      this.showCredentials();
      this.labelStyle = {'color': '#03a9f4'}
      this._cookies.set('token_id', token);
      this.redirectDashboard();
    }
    else{
      this.msgLogin = "Network error"
      this.showCredentials();
      this.labelStyle = {'color':'red'}
    }
  }

  redirectDashboard(){
    setTimeout(() => {
      this._router.navigateByUrl('/dashboard');
    }, 1800);
  }

  showCredentials(){
    this.labelStyle = {
      'opacity': '1'
    }
    setTimeout(() => {
      this.labelStyle = {
        'opacity': '0'
      }
    }, 2500);
  }

  showLoading(){
    this.loadingGif = {
      'opacity':'1',
      'display':'block'
    }
  }

  hideLoading(){
    this.loadingGif = {
      'opacity':'0',
      'display':'none'
    }
  }

}