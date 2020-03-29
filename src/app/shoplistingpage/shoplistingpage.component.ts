import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
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
        private launchNavigator: LaunchNavigator,
        private platform: Platform
    ) { }

    public ngOnInit(): void {
        // let options: LaunchNavigatorOptions = {
        //     start: 'London, ON',
        //     app: this.launchNavigator.APP.GOOGLE_MAPS
        // }
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