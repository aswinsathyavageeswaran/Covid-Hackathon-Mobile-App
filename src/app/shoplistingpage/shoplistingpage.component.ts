import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Platform } from '@ionic/angular';


@Component({
    selector: 'app-shop-listing-page',
    templateUrl: 'shoplistingpage.component.html',
    styleUrls: ['shoplistingpage.component.scss']
})
export class ShopListingPageComponent implements OnInit {

    public shopList: any;

    constructor(
        public dataService: DataService,
        private platform: Platform
    ) { }

    public ngOnInit(): void {
        let closedShops = this.dataService.nearbyShops.filter(s => s.Status == 2);
        this.dataService.nearbyShops = this.dataService.nearbyShops.filter(s => s.Status != 2);
        this.dataService.nearbyShops = this.dataService.nearbyShops.concat(closedShops);
    }

    public navigateTo(location: any): void {
        if (location && location.coordinates && location.coordinates.length) {
            let destination = location.coordinates[1] + ',' + location.coordinates[0];
    
            if (this.platform.is('ios')) {
                window.open('maps://?q=' + destination, '_system');
            } else {
                let label = encodeURI('My Label');
                window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
            }
        }
        else {
            this.dataService.presentErrorToast("Failed to get the location, Please try again");
        }
    }
}