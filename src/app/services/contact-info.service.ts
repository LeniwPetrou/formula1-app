import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {
  contactForm: FormGroup;
  baseUrl: string = `${environment.apiBaseUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  initializeContactForm() {
    this.contactForm = new FormGroup({
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      driverId: new FormControl('', Validators.required) 
    });
    return this.contactForm ;
  }

  getDrivers(){
    return this.http.get<any>(`${this.baseUrl}/drivers.json`, {responseType: 'json'})
  }

  postContact(contactForm){
    return this.http.post<any>(`${this.baseUrl}/contact`,contactForm)
  }
}
