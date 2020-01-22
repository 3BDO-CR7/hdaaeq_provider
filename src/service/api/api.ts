import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Events} from "ionic-angular";


@Injectable()
export class ApiProvider {
  baseUrl      = 'http://hadaek.aait-sa.com/api/';
  public myGlobalVar: any = [];
  constructor(
    private event       : Events,
    public http         : HttpClient) {

  }

  // Api Reigesterion

  signUp(data):Observable<any> {
    return this.http.post(`${this.baseUrl}provider-register`,data).map((response) => {return response});
  }

  signIn(data):Observable<any> {
    return this.http.post(`${this.baseUrl}login`,data).map((response) => {return response});
  }

  verifyCode(data):Observable<any> {
    return this.http.post(`${this.baseUrl}verify-account`,data).map((response) => {return response});
  }

  sentCode(data):Observable<any> {
    return this.http.post(`${this.baseUrl}send-code`,data).map((response) => {return response});
  }

  forgetPassword(data):Observable<any> {
    return this.http.post(`${this.baseUrl}forget-password`,data).map((response) => {return response});
  }

  newPassword(data):Observable<any> {
    return this.http.post(`${this.baseUrl}reset_password`,data).map((response) => {return response});
  }

  codes(data):Observable<any> {
    return this.http.post(`${this.baseUrl}codes`,data).map((response) => {return response});
  }

  cities(data):Observable<any> {
    return this.http.post(`${this.baseUrl}cities`,data).map(response => {return response});
  }

  countries(data):Observable<any> {
    return this.http.get(`${this.baseUrl}countries`,data).map(response => {return response});
  }

  about(data):Observable<any> {
    return this.http.post(`${this.baseUrl}about`, data).map(response => {return response});
  }

  contact(data):Observable<any> {
    return this.http.get(`${this.baseUrl}contact-info`,data).map(response => {return response});
  }

  profile(data):Observable<any> {
    return this.http.post(`${this.baseUrl}profile`, data).map(response => {return response});
  }

  editprofile(data):Observable<any> {
    return this.http.post(`${this.baseUrl}update-profile`, data).map(response => {return response});
  }

  editPassword(data):Observable<any> {
    return this.http.post(`${this.baseUrl}update_password`, data).map(response => {return response});
  }

  newOrder(data):Observable<any> {
    return this.http.post(`${this.baseUrl}provider_new_orders`, data).map(response => {return response});
  }

  activeOrder(data):Observable<any> {
    return this.http.post(`${this.baseUrl}provider_active_orders`, data).map(response => {return response});
  }

  finishOrder(data):Observable<any> {
    return this.http.post(`${this.baseUrl}provider_finished_orders`, data).map(response => {return response});
  }
  
  sentMessage(data):Observable<any> {
    return this.http.post(`${this.baseUrl}contact_us`, data).map(response => {return response});
  }
  
  notification(data):Observable<any> {
    return this.http.post(`${this.baseUrl}notifiactions`, data).map(response => {return response});
  }
  
  deleteNotifiaction(data):Observable<any> {
    return this.http.post(`${this.baseUrl}delete_notifiaction`, data).map(response => {return response});
  }

  banckTransfer(data):Observable<any> {
    return this.http.post(`${this.baseUrl}payment_transfer`, data).map(response => {return response});
  }

  bankAccount(data):Observable<any> {
    return this.http.post(`${this.baseUrl}bank_account`, data).map(response => {return response});
  }

  providerNewOrder(data):Observable<any> {
    return this.http.post(`${this.baseUrl}provider_new_order_details`, data).map(response => {return response});
  }

  providerActiveOrder(data):Observable<any> {
    return this.http.post(`${this.baseUrl}provider_active_orders`, data).map(response => {return response});
  }

  orderActivedetails(data):Observable<any> {
    return this.http.post(`${this.baseUrl}provider_active_order_details`, data).map(response => {return response});
  }

  orderNewdetails(data):Observable<any> {
    return this.http.post(`${this.baseUrl}provider_new_order_details`, data).map(response => {return response});
  }

  sendOffer(data):Observable<any> {
    return this.http.post(`${this.baseUrl}send_offer`, data).map(response => {return response});
  }
  
  orderservices(data):Observable<any> {
    return this.http.post(`${this.baseUrl}order_services`, data).map(response => {return response});
  }
  
  notifiaction_status(data):Observable<any> {
    return this.http.post(`${this.baseUrl}notifiaction_status`, data).map(response => {return response});
  }

  



}
