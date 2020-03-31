import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
    selector: 'app-details-page',
    templateUrl: 'detailspage.component.html',
    styleUrls: ['detailspage.component.scss']
})
export class DetailsPageComponent implements OnInit {

    private userCurrentLocation: any = undefined;
    public isShopView: boolean = false;

    constructor(
        private router: Router,
        private geolocation: Geolocation,
        public dataService: DataService,
        private storage: Storage,
        private menuCntrl: MenuController,
        private alertController: AlertController
    ) { }

    public ngOnInit(): void {
        if (!this.dataService.loggedInShopDetails) {
            let userData = this.storage.get("userData");
            userData.then(data => {
                if (data) {
                    this.dataService.loggedInShopDetails = JSON.parse(data);
                }
            }, () => this.dataService.presentErrorToast("Failed to get data from sqlite"));
        }
        this.getLocation();
    }

    public login(): void {
        this.menuCntrl.close();
        this.router.navigateByUrl("login");
    }

    public register(): void {
        this.menuCntrl.close();
        this.router.navigateByUrl("register");
    }

    public goToShopListing(item: any): void {
        this.dataService.loading$.next(true);
        const payload = {
            Longitude: this.userCurrentLocation.coords.longitude,
            Latitude: this.userCurrentLocation.coords.latitude,
            TypeOfBusiness: item.TypeId
        };
        this.dataService.selectedBusinessType = item;
        this.dataService.getNearByShops(payload)
            .subscribe(res => {
                this.dataService.loading$.next(false);
                if (res) {
                    this.dataService.nearbyShops = res;
                    this.dataService.nearbyShops.map(s => {
                        if (s.DeliveryNumber) {
                            s.IsHomeDeliveryAvailable = true;
                        }
                    });
                    this.router.navigateByUrl("shoplist");
                }
            },
                () => {
                    this.dataService.loading$.next(true);
                    this.dataService.presentErrorToast("Failed to get Nearest Shops, Please try again");
                });
    }

    public getLocation(): void {
        this.dataService.loading$.next(true);
        this.geolocation.getCurrentPosition().then((resp) => {
            this.dataService.getBusinesssTypes();
            this.userCurrentLocation = resp;
            this.dataService.currentLoggedInUserLocation = resp;
        }).catch((error) => {
            this.dataService.loading$.next(false);
            console.log('Error getting location', error);
        });

        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
            if ((data.coords.latitude != this.userCurrentLocation.coords.latitude) || (data.coords.longitude != this.userCurrentLocation.coords.longitude)) {
                this.userCurrentLocation = data;
            }
        });
    }

    public toggleButtonChanged(): void {
        if (this.isShopView) {
            if (document.getElementsByTagName("ion-toggle") && document.getElementsByTagName("ion-toggle")[0]) {
                document.getElementsByTagName("ion-toggle")[0].checked = false;
            }
            this.router.navigateByUrl("shopdetails");
        }
    }

    public logout(): void {
        this.menuCntrl.close();
        this.dataService.presentSuccessToast("You are logged out from the application");
        // this.dataService.shopList = undefined;
        this.dataService.loggedInShopDetails = undefined;
        this.storage.clear();
        // this.dataService.businessTypes = [];
        // this.dataService.nearbyShops = [];
        // this.dataService.selectedBusinessType = undefined;
        // this.dataService.currentLoggedInUserLocation = undefined;
        // this.storage.clear();
        this.router.navigateByUrl("details");
    }

    public changePassword(): void {
        this.menuCntrl.close();
        this.presentPrompt();
    }

    async presentPrompt() {
        let alert = this.alertController.create({
          header: 'Change Password',
          inputs: [
            {
              name: 'password',
              placeholder: 'Enter New Password',
              type: "password"
            },
            {
              name: 'confirmPassword',
              placeholder: 'Confirm Password',
              type: 'password'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Update',
              handler: data => {
                if (!data.password.trim().length || !data.confirmPassword.trim().length) {
                  return false;  
                }
                if (data.password != data.confirmPassword) {
                    this.dataService.presentErrorToast("Password does not match");
                }
                else {
                    this.updatePassword(data);
                }
              }
            }
          ]
        });
        (await alert).present();
      }

    private updatePassword(data: any): void {
        this.dataService.loading$.next(true);
        let payload = this.dataService.loggedInShopDetails;
        payload.Password = data.password;
        this.dataService.updateProfile(payload) 
        .subscribe(res => {
            this.dataService.loading$.next(false);
            if (res) {
                this.dataService.presentSuccessToast("Password updated successfully");
                this.logout();
            }
            else {
                this.dataService.presentErrorToast("Failed to update the password, Please try again");
            }
        },
        () => {
            this.dataService.loading$.next(false);
            this.dataService.presentErrorToast("Failed to update the password, Please try again");
        });

    }
}