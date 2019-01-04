import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import axios from 'axios';
import {CookieService} from 'ngx-cookie-service';
import swal from 'sweetalert';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  public numberOfPersonsArr = [];
  private numberOfPersons:number = 10;
  public persons:number;

  public alertStyle: object;
  public alertMsg:string;
  private alertStyle2: object;
  private alertMsg2:string;

  public date:String;
  private dateArr = [];
  public minDate = new Date();

  public time:Date = new Date();
  private timeArr = [];
  public mstep:number = 30;
  public minTime: Date = new Date();
  public maxTime: Date = new Date();

  private modalConfirmation:object;
  private finalMsgModalText: string = "Reservation Done";
  private finalMsgModalType:string = "info";
  private confirmationMsg:object;
  private modalRef: BsModalRef;
  private modalRef2: BsModalRef;

  private name:string;
  private secName:string;
  private email:string;
  private phoneNumber:string;
  private addInfo:string;


  constructor(private _modalService: BsModalService, private _cookies: CookieService) { 
    this.minTime.setHours(10);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(21);
    this.maxTime.setMinutes(0);
    this.time.setHours(10);
    this.time.setMinutes(0);
  }

  ngOnInit() {
    for (let index = 0; index < this.numberOfPersons; index++) {
      this.numberOfPersonsArr[index] = index+1;
    }
  }

  openModal(template: TemplateRef<any>) {
    let validDate = this.checkDate();
    if (validDate){
      this.parseDate();
      this.modalRef = this._modalService.show(template);
    }
    console.log(this.date);
  }

  parseDate(){
    this.dateArr = this.date.toString().split(" ");
    this.timeArr = this.time.toString().split(" ");
    this.timeArr = this.timeArr[4].split(":");
  }

  openModal2(template: TemplateRef<any>) {
    let validData = this.checkData();
    if(validData)
      this.modalRef2 = this._modalService.show(template, { class: 'second' });
    if(!this.addInfo)
      this.addInfo = "No special request";
  }

  checkDate(): boolean{
    if (!this.persons) {
      this.toggleAlertMsg(1, "You need to choose the number of persons");
      return false;
    }
    else if(!this.date){
      this.toggleAlertMsg(1, "You need to choose the reservation date");
      return false;
    }
    else{
      return true;
    }
  }

  checkData(): boolean{
    if (!this.name) {
      this.toggleAlertMsg(2, "Name is necessary");
      return false;
    }
    else if(!this.secName){
      this.toggleAlertMsg(2, "Second name  is necessary");
      return false;
    }
    else if(!this.email){
      this.toggleAlertMsg(2, "Email  is necessary");
      return false;
    }
    else if(!this.phoneNumber){
      this.toggleAlertMsg(2, "Phone number  is necessary");
      return false;
    }
    else{
      return true;
    }
  }

  toggleAlertMsg(noAlert:number, msg:string){
    if (noAlert == 1) {
      this.alertStyle = {
        'opacity': '1',
        'margin-top': '2em'
      }
      this.alertMsg = msg;

      setTimeout(() => {
        this.alertStyle = {
          'opacity': '0',
          'margin-top': '-3em'
        }
      }, 2000);
    }
    else if(noAlert == 2){
      this.alertStyle2 = {
        'opacity': '1',
        'margin-top': '0',
        'margin-bottom': '1em'
      }
      this.alertMsg2 = msg;

      setTimeout(() => {
        this.alertStyle2 = {
          'opacity': '0',
          'margin-top': '-3em'
        }
      }, 2000);
    }
  }

  async sendData(){
    let data:object = {
      'name': this.name,
      'secondName': this.secName,
      'numberPersons': this.persons,
      'email': this.email,
      'phone': this.phoneNumber,
      'date': this.date,
      'time': this.time,
      'specialRequest': this.addInfo,
      'token': 'reservationPage'
    }
    this.finalMsgModalText = "Saving reservartion";
    this.confirmationMsg = {
      'opacity': '1',
      'bottom': '0'
    }
    let respData = await axios.post('http://localhost:3000/reservations', data);
    if(respData.data.code == "200"){
      swal("Reservation done", " ", "success");
      setTimeout(() => {
        this.modalRef2.hide();
        this.modalRef.hide();
      }, 2500);
      
    }
    else{
      this.finalMsgModalType = "fail"
      this.finalMsgModalText = "Network error. Try again.";
    }
  }
  
}