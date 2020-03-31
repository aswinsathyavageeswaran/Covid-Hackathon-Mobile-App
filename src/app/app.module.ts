import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';
import { TabsPage } from './tabs/tabs.page';
import { HomePageComponent } from './homepage/homepage.component';
import { LoginPageComponent } from './login/loginpage.component';
import { RegisterPageComponent } from './register/register.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DetailsPageComponent } from './detailspage/detailspage.component';
import { ShopListingPageComponent } from './shoplistingpage/shoplistingpage.component';
import { ShopDetailsPageComponent } from './shopdetailpage/shopdetailpage.component';
import { HttpClientModule } from "@angular/common/http";
import { LoaderComponent } from './loader-component/loader-component';
import { IonicStorageModule } from '@ionic/storage';
import { DataService } from './data.service';

// import { AngularFireModule } from 'angularfire2';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { Firebase } from '@ionic-native/firebase/ngx';
// import { PushNotificationService } from './push-notification.service';

// const config = {
//   apiKey: "AIzaSyB47Vg2pW0AwQklFiM2swurCJ_esQ10gLI",
//   authDomain: "locatez.firebaseapp.com",
//   databaseURL: "https://locatez.firebaseio.com",
//   projectId: "locatez",
//   storageBucket: "locatez.appspot.com",
//   messagingSenderId: "976518623917"
// };


@NgModule({
  declarations: [
    AppComponent,
    TabsPage,
    Tab1Page,
    Tab2Page,
    Tab3Page,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    DetailsPageComponent,
    ShopListingPageComponent,
    ShopDetailsPageComponent,
    LoaderComponent
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: 'locatez',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
    // AngularFireModule.initializeApp(config),
    // AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    DataService,
    //Firebase,
    // PushNotificationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
