import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public toastController: ToastController,
    // private pushNotifcationService: PushNotificationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.notificationSetup();
    });
  }

  // private notificationSetup() {
  //   this.pushNotifcationService.getToken();
  //   this.pushNotifcationService.onNotifications().subscribe(
  //     (msg) => {
  //       if (this.platform.is('ios')) {
  //         this.presentToast(msg.aps.alert);
  //       } else {
  //         this.presentToast(msg.body);
  //       }
  //     });
  // }

  // private async presentToast(message) {
  //   const toast = await this.toastController.create({
  //     message,
  //     duration: 3000
  //   });
  //   toast.present();
  // }
}
