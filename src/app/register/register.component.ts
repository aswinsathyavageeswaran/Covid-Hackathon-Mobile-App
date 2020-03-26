import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterPageComponent implements OnInit {

 public name: string = "ANgular Training";
  constructor(
  ) {}

  public registrationData: any = {
    FirstName: "",
    LastName: "",
    MobileNumber: undefined,
    Email: "",
    Password: "",
    IsVendor: false,
    ShopName: "",
    BusinessType: ""
  };

  public businessTypes: Array<any> = [];


  public ngOnInit(): void {
    this.businessTypes = [
        {
            Id: 1,
            Description: "Groceries"
        },
        {
            Id: 2,
            Description: "Medical"
        },
        {
            Id: 3,
            Description: "Vegetables"
        }
    ]    
  }

  public register(): void {
      console.log(this.registrationData);
    // #TODO integrate the register API
  }

}
