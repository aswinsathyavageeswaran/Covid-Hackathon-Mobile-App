import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: 'loginpage.component.html',
  styleUrls: ['loginpage.component.scss']
})
export class LoginPageComponent implements OnInit {

 public email: string = "";
 public password: string = "";
  constructor(
  ) {}


  public ngOnInit(): void {
//     const config: BackgroundGeolocationConfig = {
//         desiredAccuracy: 10,
//         stationaryRadius: 20,
//         distanceFilter: 30,
//         debug: true, //  enable this hear sounds for background-geolocation life-cycle.
//         stopOnTerminate: false, // enable this to clear background location settings when the app terminates
//     };

//     this.backgroundGeolocation.configure(config)
//   .then(() => {

//     this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
//       console.log(location);

//       // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
//       // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
//       // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
//       this.backgroundGeolocation.finish(); // FOR IOS ONLY
//     });

//   });

// // start recording location
// this.backgroundGeolocation.start();

  }

  public signIn(): void {
      console.log(this.email, this.password);
    // #TODO integrate the sigin API
  }

}
