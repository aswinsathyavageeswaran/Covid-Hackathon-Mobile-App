import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: "root"
})
export class DataService {
    public shopList: any = undefined;
    public loggedInShopDetails: any = undefined;
    public businessTypes: Array<any> = [];
    public baseUrl: string = "https://hackcovidapicore20200328111910.azurewebsites.net/api/";
    public nearbyShops: Array<any> = [];
    public selectedBusinessType: any = undefined;
    public currentLoggedInUserLocation: any = undefined;
    public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public businessTypeImageNames = {
        1: "medical.jpg",
        2: "grocery.jpg",
        3: "health.jpg",
        4: "vegetables.jpg",
        5: "petrol.jpg",
        6: "milk-meat.jpg"
    };

    constructor(
        private httpClient: HttpClient,
        private toastController: ToastController
    ) { }

    public get(url: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set("Accept", "application/json");
        const options = { headers: headers };
        return this.httpClient.get(url, options);
    }

    public post(url: string, payload: any): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set("Accept", "application/json");
        const options = { headers: headers };
        return this.httpClient.post(url, payload, options);
    }

    public login(payload: any): Observable<any> {
        const url = `${this.baseUrl}user/login`;
        return this.post(url, payload);
    }

    public register(payload: any): Observable<any> {
        const url = `${this.baseUrl}user/register`;
        return this.post(url, payload);
    }

    public updateProfile(payload: any): Observable<any> {
        const url = `${this.baseUrl}user/updateprofile`;
        return this.post(url, payload);
    }

    public getBusinesssTypes(): void {
        const url = `${this.baseUrl}Shop/getbusinesstypes`;
        this.loading$.next(true);
        this.get(url)
        .subscribe(res => {
            this.loading$.next(false);
            if (res && res.length) {
                this.businessTypes = res;
                this.businessTypes.map(b => {
                    b.img = this.businessTypeImageNames[b.TypeId];
                });
            }
        },
        () => {
            this.loading$.next(false);
            this.presentErrorToast("Failed to get Business Types")
        });
    }

    public updateShopStatus(payload): Observable<any> {
        const url = `${this.baseUrl}Shop/changeshopstatus`;
        return this.post(url, payload);
    }

    public getNearByShops(payload): Observable<any> {
        const url = `${this.baseUrl}Shop/shopsnearby`;
        return this.post(url, payload);
    }

    public async presentSuccessToast(message: string) {
        const toast = await this.toastController.create({
            duration: 2000,
            color: 'success',
            message: message
        });
        toast.present();
    }

    public async presentErrorToast(message: string) {
        const toast = await this.toastController.create({
            duration: 2000,
            color: 'danger',
            message: message
        });
        toast.present();
    }

    public async presentMessageToast(message: string) {
        const toast = await this.toastController.create({
            duration: 2000,
            color: 'primary',
            message: message
        });
        toast.present();
    }
    
}