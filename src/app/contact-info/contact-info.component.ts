import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactInfoService } from '../services/contact-info.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  driversList: any[]= [];
  contactForm: FormGroup;
  constructor(
    private contactInfoService: ContactInfoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.contactForm = this.contactInfoService.initializeContactForm();
    this.getDrivers();
  }

  submit() {
    this.contactInfoService.postContact(this.contactForm.value).subscribe(
      {
        next: data => {
          this.snackBar.open('Your message sent successfully.' , 'Close',{
              duration: 3000
            }
          );
        },
        error: error => {
          this.snackBar.open('Error on sending message.' , 'Close',{
              duration: 3000
            }
          );
        }
      }
    ); 
  }

  getDrivers(){
    this.contactInfoService.getDrivers().subscribe(
      {
        next: data => {
          this.driversList = data.MRData.DriverTable.Drivers;
        },
        error: error => {
          this.snackBar.open('There was an error getting the drivers.' , 'Close',{
            duration: 3000
          });
        }
      }
    )
  }

  changeDriver(event){
    if (event.isUserInput) {  
      console.log('You have selected a driver!');
    }
  }
}
