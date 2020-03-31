import { Component, OnInit } from '@angular/core';
// import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-register-page',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public name: string = "ANgular Training";
  public isFormDirty: boolean = true;
  private isOtherFieldsEntered: boolean = false;
  public confirmPassword: string = ""

  constructor(
    public dataService: DataService,
    private router: Router,
    private alertCtrl: AlertController,
    private geolocation: Geolocation
  ) { }

  public registrationData: any = {
    FirstName: "",
    LastName: "",
    Phone: undefined,
    UserEmail: "",
    Password: "",
    ShopName: "",
    Address: "",
    TypeOfBusiness: "",
    IsHomeDeliveryAvailable: false,
    DeliveryNumber: undefined
  };


  public ngOnInit(): void {
    if (!this.dataService.currentLoggedInUserLocation || !this.dataService.currentLoggedInUserLocation.coords.longitude || !this.dataService.currentLoggedInUserLocation.coords.latitude) {
      this.dataService.presentErrorToast("Failed to get your current location, Please try again");
      this.router.navigateByUrl("details");
    }

    if (!this.dataService.loggedInShopDetails) {
      this.presentAlert();
    }

    if (!this.dataService.businessTypes || !this.dataService.businessTypes.length) {
      this.dataService.getBusinesssTypes();
    }

    if (this.dataService.loggedInShopDetails) {
      this.registrationData = this.dataService.loggedInShopDetails;
      this.registrationData.TypeOfBusiness = this.registrationData.TypeOfBusiness.toString();
      this.doValidation();
      this.toggleButtonChanged(this.registrationData.IsHomeDeliveryAvailable);
    }
  }

  public register(): void {
    this.registrationData.TypeOfBusiness = parseInt(this.registrationData.TypeOfBusiness);
    // Updating the user profile
    if (this.dataService.loggedInShopDetails) {
      this.dataService.loading$.next(true);
      this.dataService.updateProfile(this.registrationData)
        .subscribe(res => {
          this.dataService.loading$.next(false);
          if (res != undefined || res != null) {
            this.dataService.presentSuccessToast("Profile Updated Successfully");
          }
        }, () => {
          this.dataService.loading$.next(false);
          this.dataService.presentErrorToast("Failed to Update, Please try again");
        });
    }
    // Creating the user profile
    else {
      if (this.confirmPassword != this.registrationData.Password) {
        this.dataService.presentErrorToast("Password does not match");
      }
      else {
        var payload = this.registrationData;
        payload.Longitude = this.dataService.currentLoggedInUserLocation.coords.longitude;
        payload.Latitude = this.dataService.currentLoggedInUserLocation.coords.latitude;
        this.dataService.loading$.next(true);
        this.dataService.register(payload)
          .subscribe(res => {
            this.dataService.loading$.next(false);
            if (res != undefined || res != null) {
              this.dataService.presentSuccessToast("Registered Successfully, Please login");
              this.router.navigateByUrl("login");
            }
          }, (err) => {
            this.dataService.loading$.next(false);
            (err && err.length && typeof err == 'string') ? this.dataService.presentErrorToast(err) : this.dataService.presentErrorToast("Failed to Register, Please try again");
          });
      }
    }

    //this.sendEmail();
  }

  public formChanged(event: any, fieldName: string): void {

    switch (fieldName) {
      case "ShopName":
        this.registrationData.ShopName = event;
        break;
      case "TypeOfBusiness":
        this.registrationData.TypeOfBusiness = event;
        break;
      case "Address":
        this.registrationData.Address = event;
        break;
      case "FirstName":
        this.registrationData.FirstName = event;
        break;
      case "LastName":
        this.registrationData.LastName = event;
        break;
      case "Phone":
        this.registrationData.Phone = event;
        break;
      case "UserEmail":
        this.registrationData.UserEmail = event;
        break;
      case "Password":
        this.registrationData.Password = event;
        break;
      case "ConfirmPassword":
        this.confirmPassword = event;
        break;
      case "DeliveryNumber":
        this.registrationData.DeliveryNumber = event;
        break;
    }
    this.isFormDirty = true;
    this.doValidation();
  }

  private doValidation(): void {
    if (this.registrationData.FirstName && this.registrationData.FirstName.trim().length
      && this.registrationData.ShopName && this.registrationData.ShopName.trim().length
      && this.registrationData.TypeOfBusiness
      && this.registrationData.Address && this.registrationData.Address.trim().length
      && this.registrationData.Phone && this.registrationData.Phone > 999999999
      && this.registrationData.UserEmail && this.registrationData.UserEmail.trim().length
      && (this.dataService.loggedInShopDetails ? true : this.registrationData.Password && this.registrationData.Password.trim().length)
      && (this.dataService.loggedInShopDetails ? true : this.confirmPassword && this.confirmPassword.trim().length)
    ) {
      this.isOtherFieldsEntered = true;
      this.isFormDirty = this.registrationData.IsHomeDeliveryAvailable && !this.registrationData.DeliveryNumber ? true : false;
      if (this.registrationData.DeliveryNumber && this.registrationData.DeliveryNumber < 999999999) {
        this.isFormDirty = true;
      }
    }
    else {
      this.isFormDirty = true;
    }
  }

  public toggleButtonChanged(event: any) {
    if (event) {
      this.isFormDirty = (event && !this.registrationData.DeliveryNumber) ? true : !this.isOtherFieldsEntered;
    }
    else {
      this.registrationData.DeliveryNumber = "";
      this.isFormDirty = this.isOtherFieldsEntered ? false : true;
    }
  }

  // private sendEmail() {
  //   this.emailComposer.isAvailable().then((available: boolean) => {
  //     if (available) {
  //       //Now we know we can send
  //     }
  //   });

  //   let email = {
  //     to: 'aswin7955@gmail.com',
  //     subject: 'Test Email',
  //     body: 'How are you? Nice greetings from Leipzig',
  //     isHtml: true
  //   }

  //   // Send a text message using default options
  //   this.emailComposer.open(email);
  // }

  async presentAlert() {
    let alert = this.alertCtrl.create({
      header: 'Are you at Shop',
      message: 'Is this the location of your shop/service area? <br /> <br />Note : This location will be used to guide customer to your shop/service area',//'The registration needs the correct location of your Shop. If you are NOT at your shop, please update the location once you have registered',
      cssClass: "popup-container",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.dataService.presentErrorToast("Please go to your shop/service area and register");
            this.router.navigateByUrl("details");
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //this.router.navigateByUrl("details");
          }
        }
      ]
    });
    (await alert).present();
  }

  public getLocation(): void {
    this.dataService.loading$.next(true);
    this.geolocation.getCurrentPosition().then((resp) => {
      let payload = this.registrationData;
      this.dataService.currentLoggedInUserLocation = resp;
      payload.Longitude = resp.coords.longitude;
      payload.Latitude = resp.coords.latitude;
      this.dataService.updateProfile(this.registrationData)
        .subscribe(res => {
          this.dataService.loading$.next(false);
          if (res != undefined || res != null) {
            this.dataService.presentSuccessToast("Location Updated Successfully");
          }
        }, () => {
          this.dataService.loading$.next(false);
          this.dataService.presentErrorToast("Failed to Update the Location, Please try again");
        });
    }).catch((error) => {
      this.dataService.loading$.next(false);
      this.dataService.presentErrorToast("Failed to update the location, Please try again");
      console.log('Error getting location', error);
    });
  }

}
