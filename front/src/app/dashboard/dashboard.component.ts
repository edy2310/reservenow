import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import axios from 'axios';
import swal from 'sweetalert';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private cookieSet:boolean;
  public data:any;
  public loadingGif:object = {
    'opacity':'0',
    'display':'none'
  }

  constructor(private _router: Router, private _cookies:CookieService) { }

  async ngOnInit() {
    this.cookieSet = this._cookies.check('token_id');
    if(!this.cookieSet)
      this._router.navigateByUrl('/login');
    
    this.showLoading();
    let token = this._cookies.get('token_id');
    let data:object = {
      'token': token
    }
    let dataRec = await axios.post('http://localhost:3000/reservations/getReservations', data); 
    this.data = dataRec.data;
    this.parseDate();
    this.hideLoading();
  }

  killSession(){
    this._cookies.delete('token_id');
    this._router.navigateByUrl('/login');
  }

  showToday(){
    console.log(this.data[0].date);
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

  parseDate(){
    //Date
    this.data.forEach((element: { date: { split: (arg0: string) => void; }; stringDate: string; }) => {
      let parseDate = element.date.split("-");
      let parseYear = parseDate[0];
      let parseDay = parseDate[2].split("T");
      parseDay = parseDay[0];
      let parseMonth = parseDate[1];
      parseMonth--;
      let parsedDate = new Date(parseYear, parseMonth, parseDay);
      element.stringDate = parsedDate.toDateString();
    });
    //Hour
    this.data.forEach((el: { time: { split: (arg0: string) => void; }; stringTime: string; }) => {
      let parseTime = el.time.split("T");
      parseTime = parseTime[1].split(":");

      let correctHour = parseInt(parseTime[0]);
      correctHour = correctHour-6;
      parseTime[0] = correctHour;

      el.stringTime = parseTime[0] + ":" + parseTime[1];
    });
  }

  confirmDeleteReservation(id: any){
    let swalOpt:object ={
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this reservation",
      icon : "warning",
      buttons: true,
      dangerMode: true
    }
    swal(swalOpt).then((value: boolean) => {
      if(value == true){
        this.deleteReservation(id);
      }
    });
  }

  async deleteReservation(id: any){
    let token = this._cookies.get('token_id');
    let dataSet = {
      id,
      token
    }
    let dataRec = await axios.post('http://localhost:3000/reservations/delete', dataSet); 
    if(!dataRec.data.isRejected){
      this._router.navigateByUrl('/login');
    }
    else{
      let swalOpt:object={
        title: "Network error",
        text: "Try again in a moment",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }
      swal(swalOpt);
    }      
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "500px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

}