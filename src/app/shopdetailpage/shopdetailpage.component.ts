import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: 'app-shop-details-page',
    templateUrl: 'shopdetailpage.component.html',
    styleUrls: ['shopdetailpage.component.scss']
})
export class ShopDetailsPageComponent implements OnInit {

    constructor(
        private dataService: DataService
    ) { }

    public shopDetails: any = {};
    public isShopOpen: number = 0;
    public crowdValue: any = 0;
    public crowdLabel: string = "Not Crowded";

    private crowdJson: any = {
        0: "Not Crowded",
        1: "Less Crowded",
        2: "Very Crowded"
    }

    public ngOnInit(): void {

        const loggedInUserDetails = this.dataService.loggedInShopDetails;
        if (loggedInUserDetails) {
            this.shopDetails = {
                ShopName: this.dataService.loggedInShopDetails.ShopName,
                img: this.dataService.businessTypeImageNames[this.dataService.loggedInShopDetails.TypeOfBusiness]
            }
            if (loggedInUserDetails.Status == 2) {
                // Shop was closed
                this.isShopOpen = 1;
                this.crowdValue = 0;
            }
            else {
                this.isShopOpen = 0;
                switch (loggedInUserDetails.Status) {
                    case 4:
                        this.crowdValue = 0; // If green is selected crowd status is set to 4
                        break;
                    case 5:
                        this.crowdValue = 1; // If yellow is selected crowd status is set to 5
                        break; 
                    case 1:
                        this.crowdValue = 2;  // If red is selected crowd status is set to 1
                        break;
                }
            }
        }
    }

    public toggleButtonChanged(event): void {
        const payload = {
            UserEmail: this.dataService.loggedInShopDetails.UserEmail,
            Status: event == 0 ? 0 : 2
        }
        this.dataService.loading$.next(true);
        this.dataService.updateShopStatus(payload).subscribe(res => {
            this.dataService.loading$.next(false);
            if (res) {
                this.dataService.presentSuccessToast(`Updated the shop status`);
            }
            else {
                this.dataService.presentErrorToast(`Failed to update the shop status, Please try again`);
            }
        }, () => {
            this.dataService.loading$.next(false);
            this.dataService.presentErrorToast(`Failed to update the shop status, Please try again`);
        });
    }

    public rangeChaged(event): void {
        this.crowdValue = event;
        this.crowdLabel = this.crowdJson[event];
        let crowdStatus = undefined;

        switch (event) {
            case 0:
                crowdStatus = 4; // If green is selected crowd status is set to 4
                break;
            case 1:
                crowdStatus = 5; // If yellow is selected crowd status is set to 5
                break; 
            case 2:
                crowdStatus = 1;  // If red is selected crowd status is set to 1
                break;
        }
        const payload = {
            UserEmail: this.dataService.loggedInShopDetails.UserEmail,
            Status: event
        }
        this.dataService.loading$.next(true);
        this.dataService.updateShopStatus(payload).subscribe(res => {
            this.dataService.loading$.next(false);
            if (res) {
                this.dataService.presentSuccessToast(`Crowd Limit has been set to ${this.crowdLabel}`);
            }
            else {
                this.dataService.presentErrorToast(`Failed to set the Crowd Limit, Please try again`);
            }
        }, () => {
            this.dataService.presentErrorToast(`Failed to set the Crowd Limit, Please try again`);
            this.dataService.loading$.next(false);
        });
    }
}