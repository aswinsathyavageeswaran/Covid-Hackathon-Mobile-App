import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-login-page',
    templateUrl: 'loginpage.component.html',
    styleUrls: ['loginpage.component.scss']
})
export class LoginPageComponent implements OnInit {

    public email: string = "";
    public password: string = "";
    constructor(
        private dataService: DataService,
        private router: Router,
        private storage: Storage
    ) { }

    public ngOnInit(): void {
    }

    public login(): void {
        const payload = {
            UserEmail: this.email,
            Password: this.password
        };
        this.dataService.loading$.next(true);
        this.dataService.login(payload).subscribe(res => {
            this.dataService.loading$.next(false);
            if (res && res.UserEmail) {
                if (res.DeliveryNumber && res.DeliveryNumber.length && !res.IsHomeDeliveryAvailable) {
                    res.IsHomeDeliveryAvailable = true;
                }
                this.storage.clear();
                this.storage.set('userData', JSON.stringify(res));
                this.dataService.loggedInShopDetails = res;
                this.router.navigateByUrl("details");
            }
            else {
                this.dataService.presentErrorToast("Invalid Email Id or Password");
            }
        },
        () => {
            this.dataService.loading$.next(false);
            this.dataService.presentErrorToast("Failed to Login!");
        });
    }

}
